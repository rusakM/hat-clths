const express = require("express");
const reviewController = require("../controllers/reviewController");
const authControler = require("../controllers/authController");

const router = express.Router();

router.route("/").get(reviewController.getReviews);

router
  .route("/:id")
  .get(reviewController.fillProduct, reviewController.getReview);

router.use(authControler.protect);

router.post(
  "/",
  authControler.signUser,
  reviewController.fillProduct,
  reviewController.createReview
);

router
  .route("/:id")
  .patch(reviewController.fillProduct, reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
