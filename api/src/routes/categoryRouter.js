const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

//for everyone

router.get("/", categoryController.getCategories);

router.get(
  "/:slug",
  authController.tryProtect,
  categoryController.incrementCategoryShow,
  categoryController.getCategory
);

router.get(
  "/:slug/products",
  authController.tryProtect,
  categoryController.incrementCategoryShow,
  categoryController.getCategoryProducts
);

//for admin

router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  categoryController.uploadPhoto,
  categoryController.resizePhoto,
  categoryController.createCategory
);

router.patch(
  "/:id",
  categoryController.uploadPhoto,
  categoryController.resizePhoto,
  categoryController.updateCategory
);

module.exports = router;
