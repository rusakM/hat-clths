/* eslint-disable no-restricted-syntax */
const Stripe = require("stripe");

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

const itemCategories = ["pizzas", "ownPizzas", "drinks", "sauces"];

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);

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
  const { user } = req.body.user;

  if (!user || !user.email) {
    return next(new AppError("Brak danych o użytkowniku", 404));
  }

  const { name, email, isNew } = user;

  let userFromDb = await User.findOne({ email });

  if (!userFromDb && !user.isNew) {
    return next(new AppError("Brak użytkownika w bazie danych", 404));
  }

  next();
});

exports.addressVerification = catchAsync(async (req, res, next) => {
  const { address } = req.body;

  if (!address || !address.id || !address.isNew) {
    return next(new AppError("Nie podano adresu dostawy", 404));
  }

  // if (address.id && !address.isNew) {
  //   const addressFromDb = await
  // }
});

exports.createBooking = catchAsync(async (req, res, next) => {});

exports.sendEmail = catchAsync(async (req, res, next) => {
  if (req.user.role === "użytkownik") {
    const url = `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
      process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
    }/myAccount/orders/${req.mappedBooking._id}`;
    const backendUrl = `${req.protocol}://${req.get("host")}`;
    await new Email(req.user, url, backendUrl).sendBooking(req.mappedBooking);
  }

  next();
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
  const { mappedBooking } = req;
  for (const category of itemCategories) {
    if (mappedBooking[category] && mappedBooking[category].length > 0) {
      mappedBooking[category].forEach(({ name, quantity, amount }) => {
        lineItems.push({
          name,
          currency: "PLN",
          quantity,
          amount,
        });
      });
    }
  }

  req.lineItems = lineItems;
  next();
};

exports.createPaymentSession = catchAsync(async (req, res, next) => {
  const { lineItems } = req;
  const stripe = Stripe(process.env.STRIPE_API_KEY);

  //create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "p24"],
    success_url: `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
      process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
    }/booking-complete/${req.mappedBooking._id}`,
    cancel_url: `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
      process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
    }`,
    customer_email: req.user.email,
    client_reference_id: `${req.mappedBooking._id}`,
    mode: "payment",
    line_items: lineItems,
  });
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.preventBooking = (req, res, next) => {
  if (req.body.paid && req.body.isFinished) {
    return next(
      new AppError("Nie można jednocześnie opłacić i zakończyć zamówienia", 404)
    );
  }
  next();
};

exports.payBooking = catchAsync(async (req, res, next) => {
  if (req.body.paid) {
    await BookingStatus.create({
      booking: req.params.id,
      description: BOOKING_STATUSES.paid,
    });
    if (req.user.role === "użytkownik") {
      const doc = await Booking.findById(req.params.id);
      const url = `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
        process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
      }/myAccount/orders/${req.params.id}`;
      const backendUrl = `${req.protocol}://${req.get("host")}`;
      await new Email(req.user, url, backendUrl).sendBookingPaid(
        doc.toObject()
      );
    }
  }

  return next();
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
