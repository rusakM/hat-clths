const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Review = require("../models/reviewModel");
const ProductPreview = require("../models/productPreviewModel");

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ productPreview: req.params.id });

  if (!reviews) {
    return next(new AppError("Brak danych", 404));
  }

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      data: reviews,
    },
  });
});

exports.fillProduct = catchAsync(async (req, res, next) => {
  if (!req.params.id && !req.body.productPreview) {
    return next(new AppError("Nie podano id produktu", 404));
  }

  let productId;

  if (req.productPreview) {
    productId = req.params.id;
    req.body.productPreview = req.params.id;
  } else {
    productId = req.body.productPreview;
  }

  const productPreview = await ProductPreview.findById(productId);

  if (!productPreview) {
    return next(new AppError("Recenzja dotyczy nieprawidłowego produktu", 404));
  }

  next();
});

exports.saveProductId = (req, res, next) => {
  req.productPreview = req.params.id;

  next();
};

exports.readProductId = (req, res, next) => {
  req.params.id = req.productPreview;

  next();
};
