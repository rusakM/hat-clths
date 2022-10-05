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

router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  newsletterController.getAll
);

module.exports = router;
