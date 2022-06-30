const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

//for everyone

router.get("/", categoryController.getCategories);

router.get("/:name", authController.tryProtect, categoryController.getCategory);

//for admin

router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  categoryController.convertExpirationDaysToTime,
  categoryController.createCoupon
);

router.patch("/:id", categoryController.updateCategory);

module.exports = router;
