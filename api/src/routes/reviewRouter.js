const express = require("express");
const reviewController = require("../controllers/reviewController");
const authControler = require("../controllers/authController");

const router = express.Router();

router.get("/", reviewController.readProductId, reviewController.getReviews);

router.use(authControler.protect, authControler.signUser);

router.post(
  "/",
  reviewController.readProductId,
  reviewController.fillProduct,
  reviewController.createReview
);

router
  .route("/:review")
  .patch(reviewController.readProductId, reviewController.updateReview)
  .delete(reviewController.readProductId, reviewController.deleteReview);

module.exports = router;
