const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const DedicatedPredictionProduct = require("../models/dedicatedPredictionProductModel");
const productsRankController = require("./productsRankController");

exports.getAll = catchAsync(async (req, res, next) => {
  if (req.user && req.user.role === "użytkownik") {
    req.query.user = req.user.id;
  }

  const docs = new APIFeatures(DedicatedPredictionProduct.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const recommendations = await docs.query;

  if (recommendations.length === 0) {
    req.query.sort = "ranksAverage";
    return productsRankController.getAll(req, res, next);
  }

  res.status(200).json({
    status: "success",
    results: recommendations.length,
    data: {
      data: recommendations,
    },
  });
});

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
