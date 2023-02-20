const Newsletter = require("../models/newsletterModel");
const DedicatedPredictionProduct = require("../models/dedicatedPredictionProductModel");
const ProductRank = require("../models/productsRankModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Email = require("../utils/email");
const formatPrice = require("../utils/formatPrice");

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
    const backendUrl = `${req.protocol}://${WEBPAGE_DOMAIN}${
      WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
    }`;
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

exports.sendNewsletter = catchAsync(async (req, res, next) => {
  // prepare urls
  const { WEBPAGE_DOMAIN, WEBPAGE_PORT } = process.env;
  const backendUrl = `${req.protocol}://${WEBPAGE_DOMAIN}${
    WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
  }`;
  const url = `${req.protocol}://${WEBPAGE_DOMAIN}${
    WEBPAGE_PORT ? `:${WEBPAGE_PORT}` : ""
  }`;

  // 1) get all users and recommendations

  const usersList = await Newsletter.find({});
  const dedicatedRecommendations = await DedicatedPredictionProduct.find({});
  const newslettersSent = [];
  // 2) loop through all users

  for (let user of usersList) {
    const {
      email,
      isActiveSubscription,
      user: { name, role, id },
    } = user;
    const newsletterId = user.id;

    // check active subscription

    if (isActiveSubscription && role === "użytkownik") {
      //get user recommendations
      const recommendations = dedicatedRecommendations
        .filter((item) => item.user.id === id)
        .sort((a, b) => b.predictionScore - a.predictionScore)
        .slice(0, 12)
        .map((item) => ({
          ...item.productPreview.toObject(),
          price: formatPrice(item.productPreview.price),
        }));

      await new Email({ email, name }, url, backendUrl).sendNewsletter(
        recommendations,
        newsletterId
      );

      newslettersSent.push({
        user: {
          id,
          email,
          name,
        },
        subscriptionId: newsletterId,
        recommendationsSent: recommendations.length,
      });
    }
  }

  res.status(200).json({
    status: "success",
    results: newslettersSent.length,
    data: {
      data: newslettersSent,
    },
  });
});
