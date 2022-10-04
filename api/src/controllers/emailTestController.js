const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Booking = require("../models/bookingModel");
const ProductPreview = require("../models/productPreviewModel");
const formatPrice = require("../utils/formatPrice");

exports.sendWelcome = catchAsync(async (req, res, next) => {
  const url = `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
    process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
  }`;
  await new Email(req.user, `${url}/login`, url).sendWelcome();

  res.status(200).json({
    status: "success",
  });
});

exports.sendBooking = catchAsync(async (req, res, next) => {
  const url = `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
    process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
  }`;

  const booking = await Booking.findById("6335edc26615a8895e2bad49");

  if (booking) {
    await new Email(req.user, `${url}/login`, url).sendBooking(booking);
  }

  res.status(200).json({
    status: "success",
  });
});

exports.sendNewsletter = catchAsync(async (req, res, next) => {
  const url = `${req.protocol}://${process.env.WEBPAGE_DOMAIN}${
    process.env.WEBPAGE_PORT ? `:${process.env.WEBPAGE_PORT}` : ""
  }`;

  let products = await ProductPreview.find({
    category: "62e2e7aaaac312f4c0f4e0c5",
  });

  for (let i = 0; i < products.length; i++) {
    products[i].price = formatPrice(products[i].price);
  }

  const mappedProducts = products.map((product) => {
    const productObj = product.toObject();
    return {
      ...productObj,
      price: formatPrice(productObj.price),
    };
  });

  await new Email(req.user, url, url).sendNewsletter(mappedProducts);

  res.status(200).json({
    status: "success",
  });
});
