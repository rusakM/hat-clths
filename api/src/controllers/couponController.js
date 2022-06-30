const factory = require("./handlerFactory");
const Coupon = require("../models/couponModel");

exports.getCoupon = factory.getOne(Coupon);
exports.updateCoupon = factory.updateOne(Coupon);
exports.deleteCoupon = factory.deleteOne(Coupon);
exports.getCoupons = factory.getAll(Coupon);
exports.createCoupon = factory.createOne(Coupon);

exports.convertExpirationDaysToTime = (req, res, next) => {
  if (!req.body.expires) {
    req.body.expires = 14;
  }

  req.body.expires *= 1000 * 60 * 60 * 24;

  next();
};
