const express = require("express");
const authController = require("../controllers/authController");
const testController = require("../controllers/emailTestController");

const router = express.Router();

router.use(authController.protect);
router.get("/welcome", testController.sendWelcome);
router.get("/booking", testController.sendBooking);
router.get("/newsletter", testController.sendNewsletter);

module.exports = router;
