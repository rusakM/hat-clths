const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const Review = require("../models/reviewModel");
const ProductPreview = require("../models/productPreview");

exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ productPreview: req.params.product });

  if (!reviews) {
    return next(new AppError("Brak danych", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: reviews,
    },
  });
});

exports.fillProduct = catchAsync(async (req, res, next) => {
  if (!req.params.product && !req.body.productPreview) {
    return next(new AppError("Nie podano id produktu", 404));
  }

  let productId;

  if (req.params.product) {
    productId = req.params.product;
    req.body.productPreview = req.params.product;
  } else {
    productId = req.body.productPreview;
  }

  const productPreview = await ProductPreview.findById(productId);

  if (!productPreview) {
    return next(new AppError("Recenzja dotyczy nieprawidłowego produktu", 404));
  }

  next();
});
