const factory = require("./handlerFactory");
const Coupon = require("../models/couponModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCoupon = factory.getOne(Coupon);
exports.updateCoupon = factory.updateOne(Coupon);
exports.deleteCoupon = factory.deleteOne(Coupon);
exports.getCoupons = factory.getAll(Coupon);
exports.createCoupon = factory.createOne(Coupon);

exports.getByCode = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    couponCode: req.params.code,
    user: req.body.user,
  });

  if (!coupon) {
    return next(new AppError("Nieprawidłowy kod kuponu", 404));
  }

  if (coupon.isUsed) {
    return next(new AppError("Kupon został już wykorzystany", 404));
  }
  coupon.user = coupon.user._id;

  res.status(200).json({
    status: "success",
    data: {
      data: coupon,
    },
  });
});

exports.convertExpirationDaysToTime = (req, res, next) => {
  if (!req.body.expires) {
    req.body.expires = 14;
  }

  req.body.expires *= 1000 * 60 * 60 * 24;

  next();
};
