const express = require("express");
const couponController = require("../controllers/couponController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.signUser);

router
  .route("/")
  .get(couponController.getCoupons)
  .post(
    authController.restrictTo("admin"),
    couponController.convertExpirationDaysToTime,
    couponController.createCoupon
  );
router.get("/code/:code", couponController.getByCode);

router
  .route("/:id")
  .get(couponController.getCoupon)
  .patch(authController.restrictTo("admin"), couponController.updateCoupon)
  .delete(authController.restrictTo("admin"), couponController.deleteCoupon);

module.exports = router;
