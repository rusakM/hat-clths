const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const DedicatedPredictionProduct = require("../models/dedicatedPredictionProductModel");

exports.getAll = factory.getAll(DedicatedPredictionProduct);
exports.create = catchAsync(async (req, res, next) => {
  const { recommendations } = req.body;

  if (!recommendations || !recommendations.length) {
    return next(new AppError("Nie przesłano żadnych danych", 404));
  }

  const insertedRows = await DedicatedPredictionProduct.insertMany(
    recommendations
  );

  if (!insertedRows) {
    return next(new AppError("Błąd w przesyłanych danych", 404));
  }

  // delete old recommendations

  await DedicatedPredictionProduct.deleteMany({
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
