const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ProductsRank = require("../models/productsRankModel");

exports.getTop20Products = (req, res, next) => {
  req.query.limit = 20;
  req.query.sort = "ranksAverage";

  next();
};

exports.getAll = factory.getAll(ProductsRank);

exports.create = catchAsync(async (req, res, next) => {
  const { recommendations } = req.body;

  if (!recommendations || !recommendations.length) {
    return next(new AppError("Nie przesłano żadnych danych", 400));
  }

  const insertedRows = await ProductsRank.insertMany(recommendations);

  if (!insertedRows) {
    return next(new AppError("Błąd w przesyłanych danych", 400));
  }

  // delete old recommendations

  await ProductsRank.deleteMany({
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
