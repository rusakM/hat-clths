const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");
const bookingStatusController = require("../controllers/bookingStatusController");

const router = express.Router();

router.use(authController.tryProtect);

router.get("/payForBooking/:id", bookingController.payForBooking);

router
  .route("/")
  .post(
    bookingController.userVerification,
    bookingController.addressVerification,
    bookingController.invoiceValidation,
    bookingController.createBooking,
    bookingController.buyProducts,
    bookingController.checkPaymentType,
    bookingController.mapBookingForPaymentSession,
    bookingController.createPaymentSession
  );

router.route("/:id").get(bookingController.getBooking);

module.exports = router;
