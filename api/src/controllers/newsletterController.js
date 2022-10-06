const Newsletter = require("../models/newsletterModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Email = require("../utils/email");

exports.getAll = factory.getAll(Newsletter);

exports.updateOne = factory.updateOne(Newsletter);

exports.signUp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  let newsletter = await Newsletter.findOne({ email });

  if (!newsletter) {
    newsletter = await Newsletter.create({ email });
  } else {
    newsletter = newsletter.toObject();
    const { WEBPAGE_DOMAIN, WEBPAGE_PORT } = process.env;
    const backendUrl = `${req.protocol}://${req.get("host")}`;
    const url = `${req.protocol}://${WEBPAGE_DOMAIN}${
      WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
    }`;

    await new Email({ email }, url, backendUrl).sendNewsletterWelcome(
      newsletter
    );

    if (!newsletter.isActiveSubscription) {
      req.body = { isActiveSubscription: true };
      req.params = { id: newsletter._id };
      return next();
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      data: newsletter,
    },
  });
});

exports.unsubscribe = (req, res, next) => {
  req.body = { isActiveSubscription: false };

  next();
};
