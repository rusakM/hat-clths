const express = require("express");
const newsletterController = require("../controllers/newsletterController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", newsletterController.signUp, newsletterController.updateOne);

router.get(
  "/unsubscribe/:id",
  newsletterController.unsubscribe,
  newsletterController.updateOne
);

//for admin!!!

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/", newsletterController.getAll);

router.get("/send-newsletter", newsletterController.sendNewsletter);

module.exports = router;
