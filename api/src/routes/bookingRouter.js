const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");
const productBoughtController = require("../controllers/productBoughtController");

const router = express.Router();

router.use(authController.tryProtect);

router.get(
  "/payForBooking/:id",
  bookingController.protectBooking,
  bookingController.payForBooking
);

router
  .route("/")
  .get(authController.protect, bookingController.getAllBookings)
  .post(
    bookingController.userVerification,
    bookingController.addressVerification,
    bookingController.invoiceValidation,
    bookingController.createBooking,
    bookingController.buyProducts,
    bookingController.getNewBooking,
    bookingController.sendEmail,
    bookingController.checkPaymentType,
    bookingController.mapBookingForPaymentSession,
    bookingController.createPaymentSession
  );

router.get(
  "/boughts",
  authController.protect,
  authController.restrictTo("admin"),
  productBoughtController.getAllProductBoughts
);

router
  .route("/:id")
  .get(bookingController.protectBooking, bookingController.getBooking);

module.exports = router;
