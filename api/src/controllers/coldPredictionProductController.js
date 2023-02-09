const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ColdPredictionProduct = require("../models/coldPredictionProductModel");

exports.getAll = factory.getAll(ColdPredictionProduct);

exports.getSimilar = (req, res, next) => {
  req.query.productPreview = req.params.id;
  req.query.sort = "-predictionScore";

  next();
};

exports.create = catchAsync(async (req, res, next) => {
  const { recommendations } = req.body;

  if (!recommendations || !recommendations.length) {
    return next(new AppError("Nie przesłano żadnych danych", 400));
  }

  const insertedRows = await ColdPredictionProduct.insertMany(recommendations);

  if (!insertedRows) {
    return next(new AppError("Błąd w przesyłanych danych", 400));
  }

  // delete old recommendations

  await ColdPredictionProduct.deleteMany({
    createdAt: { $lt: recommendations[0].createdAt },
  });

  res.status(201).json({
    status: "success",
    results: insertedRows.length,
    data: {
      data: {},
    },
  });
});
