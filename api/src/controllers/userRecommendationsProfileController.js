const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const UserRecommendationsProfile = require("../models/userRecommendationsProfileModel");

exports.getOne = catchAsync(async (req, res, next) => {
  const user = await UserRecommendationsProfile.find({ user: req.user.id });

  if (!user) {
    return next(new AppError("Nie znaleziono użytkownika", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.getAll = factory.getAll(UserRecommendationsProfile);

exports.create = catchAsync(async (req, res, next) => {
  const { recommendations } = req.body;

  if (!recommendations || !recommendations.length) {
    return next(new AppError("Nie przesłano żadnych danych", 400));
  }

  const insertedRows = await UserRecommendationsProfile.insertMany(
    recommendations
  );

  if (!insertedRows) {
    return next(new AppError("Błąd w przesyłanych danych", 400));
  }

  // delete old recommendations

  await UserRecommendationsProfile.deleteMany({
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
