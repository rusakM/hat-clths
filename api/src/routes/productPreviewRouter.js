const express = require("express");
const productPreviewController = require("../controllers/productPreviewController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRouter");
const reviewController = require("../controllers/reviewController");
const productController = require("../controllers/productController");

const router = express.Router();

router.get(
  "/new",
  authController.tryProtect,
  productPreviewController.limitNewProducts,
  productPreviewController.sortNewProducts,
  productPreviewController.getProducts
);

router.get("/for-her", productPreviewController.getProductsByGender);

router.get(
  "/for-him",
  productPreviewController.indicateForHim,
  productPreviewController.getProductsByGender
);

router.get(
  "/shows",
  authController.protect,
  authController.restrictTo("admin"),
  productPreviewController.getAllProductShows
);

router.get(
  "/products",
  authController.protect,
  authController.restrictTo("admin"),
  productController.getAllProducts
);

router.get(
  "/:id",
  authController.tryProtect,
  productPreviewController.showProduct,
  productPreviewController.getProduct
);

router.use("/:id/reviews", reviewController.saveProductId, reviewRouter);

// admin routes

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/", productPreviewController.getProducts);

router.post(
  "/",
  productPreviewController.uploadPhotos,
  productPreviewController.resizePhotos,
  productPreviewController.selectCoverPhoto,
  productPreviewController.prepareProduct,
  productPreviewController.createProduct
);

router.patch(
  "/:id",
  productPreviewController.uploadPhotos,
  productPreviewController.resizePhotos,
  productPreviewController.selectCoverPhoto,
  productPreviewController.prepareProduct,
  productPreviewController.updateProduct,
  productPreviewController.updateAssociatedProducts
);

router.patch(
  "/:id/toggleProductDisability",
  productPreviewController.toggleProductDisability
);

router.patch(
  "/:id/toggleProductSizeDisability",
  productPreviewController.toggleProductSizeDisability
);

router.post("/:id/createSize", productPreviewController.createNewSize);

module.exports = router;
