/* eslint-disable no-restricted-syntax */
const Stripe = require("stripe");
const md5 = require("md5");

const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const Invoice = require("../models/invoiceModel");
const ProductBought = require("../models/productBoughtModel");
const factory = require("./handlerFactory");
const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const BookingStatus = require("../models/bookingStatusModel");
const BOOKING_STATUSES = require("../utils/bookingStatuses");
const formatPrice = require("../utils/formatPrice");

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);

// ===PROTECT BOOKING===

//only for bookings with given id
exports.protectBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { accessToken } = req.query;
  if (req.user) {
    return next();
  }

  let booking = await Booking.findById(id);

  if (!booking) {
    return next(new AppError("Nie znaleziono zamówienia w bazie danych", 404));
  }

  booking = booking.toObject();

  if (!booking.accessToken) {
    return next(new AppError("Najpierw należy się zalogować", 404));
  }

  if (booking.accessToken !== accessToken) {
    return next(new AppError("Nieprawidłowy kod dostępu", 404));
  }

  if (!req.user) {
    req.user = booking.user;
  }

  next();
});

// ===CREATE BOOKING===

// booking request

// {
//     user,
//     address,
//     isWithInvoice
//     invoice,
//     invoiceAddress,
//     products,
//     booking: {
//          deliveryType,
//          paymentInAdvance
//     }
// }

// 1) user for booking

exports.userVerification = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  if (!user || !user.email) {
    return next(new AppError("Brak danych o użytkowniku", 404));
  }

  const { name, email, isNew } = user;
  let userFromDb = await User.findOne({ email });

  if (!userFromDb && !isNew) {
    return next(new AppError("Brak użytkownika w bazie danych", 404));
  }

  if (!userFromDb) {
    userFromDb = await User.create({
      name,
      email,
      isActive: false,
      password: process.env.JWT_SECRET,
      passwordConfirm: process.env.JWT_SECRET,
    });
  }
  const accessToken = md5(`${process.env.JWT_SECRET}${userFromDb._id}`);

  userFromDb = userFromDb.toObject();
  req.booking = {
    user: userFromDb._id,
  };
  req.booking.accessToken = accessToken;
  req.user = userFromDb;
  console.log("1. user ok");

  next();
});

// 2 address for booking

// function checks if an address exists, create new id doesn't and gives this id
const addressProcessing = async (address, user) => {
  if (!address || (!address.id && !address.isNew)) {
    return new AppError("Nie podano adresu.", 404);
  }
  const {
    isNew,
    id,
    city,
    street,
    zipCode,
    houseNumber,
    flatNumber,
    phoneNumber,
  } = address;

  let addressFromDb;

  if (!isNew) {
    addressFromDb = await Address.findById(id);
  }

  if (!addressFromDb && !isNew) {
    return new AppError("Podany adres nie istnieje w bazie danych", 404);
  }

  if (!addressFromDb) {
    const addressObj = {
      user,
      city,
      street,
      phoneNumber,
      zipCode,
      houseNumber,
      phoneNumber,
    };

    if (flatNumber) {
      addressObj.flatNumber = flatNumber;
    }
    addressFromDb = await Address.create(addressObj);
  }

  addressFromDb = addressFromDb.toObject();

  return addressFromDb._id;
};

exports.addressVerification = catchAsync(async (req, res, next) => {
  const addressId = await addressProcessing(req.body.address, req.booking.user);
  if (addressId.message) {
    return next(addressId);
  }

  req.booking.address = addressId;

  console.log("2. address ok");

  next();
});

// 3 invoice for booking

exports.invoiceValidation = catchAsync(async (req, res, next) => {
  const { invoiceAddress, invoice, isWithInvoice } = req.body;
  const { user } = req.booking;

  if (!isWithInvoice) {
    console.log("3. invoice ok");
    return next();
  }

  if ((!invoiceAddress || !invoice) && isWithInvoice) {
    return next(new AppError("Brak danych do faktury", 404));
  }

  const invoiceAddressFromDb = await addressProcessing(
    invoiceAddress,
    user,
    next
  );

  if (!invoiceAddressFromDb) {
    return next(new AppError("Błąd przetwarzania adresu do faktury", 404));
  }

  const { company, nip, id, isNew } = invoice;

  let invoiceFromDb;

  if (!isNew) {
    invoiceFromDb = await Invoice.findById(id);
  }

  if (!invoiceFromDb) {
    invoiceFromDb = await Invoice.create({
      address: invoiceAddressFromDb,
      nip,
      company,
      user,
    });
  }

  invoiceFromDb = invoiceFromDb.toObject();

  req.booking.invoice = invoiceFromDb._id;

  console.log("3. invoice ok");

  next();
});

// 4 create booking

exports.createBooking = catchAsync(async (req, res, next) => {
  const { booking } = req;
  const {
    booking: { deliveryType, paymentInAdvance },
    products,
    coupon,
  } = req.body;
  if (!deliveryType || paymentInAdvance === undefined) {
    return next(
      new AppError("Wystąpił problem z wyborem sposobu dostawy", 404)
    );
  }

  const deliveryCost =
    (Math.floor(deliveryType.price * 100) + (paymentInAdvance ? 0 : 500)) / 100;

  // calculate price
  const productsPrice = products
    .map(({ price, quantity }) => price * quantity)
    .reduce((total, val) => total + val);
  let discount = 0;
  if (coupon && coupon.discount) {
    discount = Math.floor(productsPrice * 100 * (coupon.discount / 100)) / 100;
    booking.coupon = coupon.id;
  }
  const total = deliveryCost + productsPrice - discount;
  const price = productsPrice - discount;

  // prepare booking object

  booking.paymentMethod = paymentInAdvance;
  booking.deliveryType = deliveryType.name;
  booking.deliveryCost = deliveryCost;
  booking.total = total;
  booking.price = price;

  if (discount > 0) {
    booking.discount = discount;
  }

  const newBooking = await Booking.create(booking);

  req.newBooking = newBooking.toObject();

  console.log("4. booking ok");

  next();
});

// 5 products for booking

exports.buyProducts = catchAsync(async (req, res, next) => {
  const {
    body: { products },
    newBooking,
    booking,
  } = req;

  await products.forEach(
    async ({ id, category, productPreview, quantity, price }) => {
      await ProductBought.create({
        product: id,
        user: booking.user,
        category: category.id,
        booking: newBooking._id,
        productPreview,
        quantity,
        price,
      });
    }
  );

  console.log("5. products ok");

  next();
});

// 6 get new booking

exports.getNewBooking = catchAsync(async (req, res, next) => {
  let newBooking = await Booking.findById(req.newBooking._id);
  newBooking = newBooking.toObject();

  req.newBooking = newBooking;
  console.log("New booking: ", newBooking);
  console.log("6. population ok");
  next();
});

// 7 send email

exports.sendEmail = catchAsync(async (req, res, next) => {
  const { newBooking } = req;
  newBooking.price = formatPrice(newBooking.price);
  if (!req.user.role || req.user.role === "użytkownik") {
    const { WEBPAGE_PORT, WEBPAGE_DOMAIN } = process.env;
    const url = `${req.protocol}://${WEBPAGE_DOMAIN}${
      WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
    }/bookings/${newBooking._id}?accessToken=${newBooking.accessToken}`;
    const backendUrl = `${req.protocol}://${WEBPAGE_DOMAIN}${
      WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
    }`;
    await new Email(req.user, url, backendUrl).sendBooking(newBooking);
  }
  console.log("7. email ok");
  next();
});

// 8 return booking

exports.checkPaymentType = catchAsync(async (req, res, next) => {
  const { paymentMethod } = req.newBooking;

  if (paymentMethod === false) {
    console.log("8. payment type checking ok");
    res.status(200).json({
      status: "success",
      data: {
        data: req.newBooking,
      },
    });
  }

  console.log("8. payment type checking ok");

  next();
});

// 9 create booking for payment session

exports.mapBookingForPaymentSession = (req, res, next) => {
  /*
      {
          name,
          currency,
          quantity,
          amount
      }
      */
  const lineItems = [];
  const {
    products,
    booking: { deliveryType },
  } = req.body;

  products.forEach(({ name, quantity, price }) => {
    lineItems.push({
      price_data: {
        currency: "PLN",
        unit_amount: Math.floor(price * 100),
        product_data: {
          name,
        },
      },
      quantity,
    });
  });

  // add delivery to booking cost
  lineItems.push({
    price_data: {
      currency: "PLN",
      unit_amount: Math.floor(deliveryType.price * 100),
      product_data: {
        name: `Dostawa: ${deliveryType.name}`,
      },
    },
    quantity: 1,
  });

  req.lineItems = lineItems;
  console.log("9. products mapped");
  next();
};

// 10 create payment session

exports.createPaymentSession = catchAsync(async (req, res, next) => {
  const {
    lineItems,
    newBooking,
    body: { user },
    booking: { accessToken },
    protocol,
  } = req;
  const stripe = Stripe(process.env.STRIPE_API_KEY);

  //create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "p24"],
    success_url: `${protocol}://${process.env.WEBPAGE_DOMAIN}${
      process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
    }/booking-complete/${newBooking._id}${
      accessToken ? `?accessToken=${accessToken}` : ""
    }`,
    cancel_url: `${protocol}://${process.env.WEBPAGE_DOMAIN}${
      process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
    }`,
    customer_email: user.email,
    client_reference_id: `${newBooking._id}`,
    mode: "payment",
    line_items: lineItems,
  });

  console.log("10. payment session created");

  res.status(200).json({
    status: "success",
    data: {
      data: {
        session,
        booking: newBooking,
        stripeKey: process.env.STRIPE_PK,
      },
    },
  });
});

exports.generateInvoice = (req, res, next) => {
  next();
};

exports.emitBookingToSockets = (req, res, next) => {
  console.log(req.user.role);
  if (req.user.role === "użytkownik") {
    req.app.get("io").emit("booking", req.booking);
  }
  next();
};

exports.processBooking = (req, res, next) => {
  if (req.booking.isPayNow && !req.booking.paid) {
    return next();
  }

  return res.status(201).json({
    status: "success",
    data: {
      data: req.booking,
    },
  });
};

exports.preventBooking = (req, res, next) => {
  if (req.body.paid && req.body.isFinished) {
    return next(
      new AppError("Nie można jednocześnie opłacić i zakończyć zamówienia", 404)
    );
  }
  next();
};

exports.payForBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Nie podano id zamówienia", 404));
  }

  let booking = await Booking.findById(id);

  if (!booking) {
    return next(new AppError("Brak zamówienia w bazie danych", 404));
  }

  booking = booking.toObject();
  const status = booking.paid;

  if (status) {
    return next(new AppError("Zamówienie zostało już opłacone", 403));
  }

  await BookingStatus.create({
    booking: id,
    description: BOOKING_STATUSES.paid,
  });

  booking = await Booking.findByIdAndUpdate(id, { paid: true });

  // SEND MAIL TO THE CLIENT

  if (req.user.role === "użytkownik") {
    const { WEBPAGE_DOMAIN, WEBPAGE_PORT } = process.env;
    let doc = await Booking.findById(req.params.id);
    doc = doc.toObject();
    const url = `${req.protocol}://${WEBPAGE_DOMAIN}${
      WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
    }/bookings/${req.params.id}?accessToken=${doc.accessToken}`;
    const backendUrl = `${req.protocol}://${WEBPAGE_DOMAIN}${
      WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
    }`;
    await new Email(req.user, url, backendUrl).sendBookingPaid(doc);
  }

  res.status(200).json({
    status: "success",
    data: {
      data: booking,
    },
  });
});

exports.finishBooking = catchAsync(async (req, res, next) => {
  if (req.body.isFinished) {
    await BookingStatus.create({
      booking: req.params.id,
      description: BOOKING_STATUSES.done,
    });
  }

  return next();
});

exports.getOneBooking = catchAsync(async (req, res, next) => {
  const doc = await Booking.findById(req.params.id);

  if (!doc) {
    return next(new AppError("Błąd pobierania zamówienia", 404));
  }

  req.booking = doc.toObject();

  next();
});

exports.sendMappedBooking = (req, res, next) => {
  if (req.mappedBooking) {
    return res.status(200).json({
      status: "success",
      data: {
        data: req.mappedBooking,
      },
    });
  }
  next(new AppError("Nie udało się wczytać zamówienia", 404));
};

const projectAggregatedBookings = [
  {
    $project: {
      _id: 1,
      paid: 1,
      price: 1,
      createdAt: 1,
      isWithDelivery: 1,
      isPayNow: 1,
      isTakeAway: 1,
      isFinished: 1,
      user: {
        _id: 1,
        email: 1,
        name: 1,
        role: 1,
        photo: 1,
      },
      barcode: 1,
      descriptions: 1,
      submit: 1,
      inProcess: 1,
      shipping: 1,
      ready: 1,
      done: 1,
      cancel: 1,
    },
  },
  {
    $unwind: "$user",
  },
];

const sortAggregatedBookings = {
  $sort: { createdAt: 1 },
};

const defaultAggregation = [
  {
    $lookup: {
      from: "bookingstatuses",
      localField: "_id",
      foreignField: "booking",
      as: "statuses",
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "agUser",
    },
  },
  {
    $set: {
      statusCount: { $size: "$statuses" },
      descriptions: {
        $map: {
          input: "$statuses",
          as: "description",
          in: "$$description.description",
        },
      },
      user: "$agUser",
    },
  },
  {
    $set: {
      submit: {
        $in: [BOOKING_STATUSES.submit, "$descriptions"],
      },
      isPaid: {
        $in: [BOOKING_STATUSES.paid, "$descriptions"],
      },
      inProcess: {
        $in: [BOOKING_STATUSES.inProcess, "$descriptions"],
      },
      shipping: {
        $in: [BOOKING_STATUSES.shipping, "$descriptions"],
      },
      ready: {
        $in: [BOOKING_STATUSES.ready, "$descriptions"],
      },
      done: {
        $in: [BOOKING_STATUSES.done, "$descriptions"],
      },
      cancel: {
        $in: [BOOKING_STATUSES.cancel, "$descriptions"],
      },
    },
  },
];

exports.getUnapprovedOrders = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        $and: [
          { submit: true },
          { isPaid: true },
          { inProcess: false },
          { shipping: false },
          { ready: false },
          { done: false },
          { cancel: false },
        ],
      },
    },
    ...projectAggregatedBookings,
    sortAggregatedBookings,
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getUnpaidOrders = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        $and: [
          { submit: true },
          { isPaid: false },
          { inProcess: false },
          { shipping: false },
          { ready: false },
          { done: false },
          { cancel: false },
        ],
      },
    },
    ...projectAggregatedBookings,
    sortAggregatedBookings,
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getPendingOrders = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        $and: [
          { submit: true },
          { isPaid: true },
          { inProcess: true },
          { shipping: false },
          { ready: false },
          { done: false },
          { cancel: false },
        ],
      },
    },
    ...projectAggregatedBookings,
    sortAggregatedBookings,
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getShippingOrders = catchAsync(async (req, res, next) => {
  const shipping = Boolean(req.query.shipping);
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        $and: [
          { submit: true },
          { isPaid: true },
          { inProcess: true },
          { isWithDelivery: true },
          { shipping },
        ],
      },
    },
    ...projectAggregatedBookings,
    sortAggregatedBookings,
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getDoneOrders = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        $and: [
          { submit: true },
          { isPaid: true },
          { inProcess: true },
          { done: true },
        ],
      },
    },
    ...projectAggregatedBookings,
    {
      $sort: { createdAt: -1 },
    },
  ])
    .skip(req.query.skip || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getReadyOrders = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        $and: [
          { submit: true },
          { isPaid: true },
          { inProcess: true },
          { ready: true },
          { done: false },
        ],
      },
    },
    ...projectAggregatedBookings,
    sortAggregatedBookings,
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getCanceledBookings = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    {
      $match: {
        cancel: true,
      },
    },
    ...projectAggregatedBookings,
    {
      $sort: { createdAt: -1 },
    },
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.getAllAggregatedBookings = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    ...projectAggregatedBookings,
    {
      $sort: { createdAt: -1 },
    },
  ])
    .skip(req.query.skip * 1 || 0)
    .limit(25);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});

exports.test = catchAsync(async (req, res, next) => {
  const list = await Booking.aggregate([
    ...defaultAggregation,
    ...projectAggregatedBookings,
    sortAggregatedBookings,
  ]);

  res.status(200).json({
    status: "success",
    results: list.length,
    data: {
      data: list,
    },
  });
});
