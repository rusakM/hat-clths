const express = require("express");
const dedicatedPredictionProductController = require("../controllers/dedicatedPredictionProductController");
const coldPredictionProductController = require("../controllers/coldPredictionProductController");
const productRankController = require("../controllers/productsRankController");
const genderBasedRecommendationController = require("../controllers/genderBasedRecommendationController");
const userRecomendationsProfileController = require("../controllers/userRecommendationsProfileController");
const authController = require("../controllers/authController");
const recommendationsController = require("../controllers/recommendationsController");

const router = express.Router();

router.get(
  "/",
  authController.tryProtect,
  recommendationsController.selectRecommendations
);

router
  .route("/cold")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    coldPredictionProductController.getAll
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    coldPredictionProductController.create
  );

router.get(
  "/cold/:id",
  coldPredictionProductController.getSimilar,
  coldPredictionProductController.getAll
);
router.get("/rank", productRankController.getAll);
router.get(
  "/rank/top20",
  productRankController.getTop20Products,
  productRankController.getAll
);

router.get(
  "/male",
  genderBasedRecommendationController.getTopProducts("male"),
  genderBasedRecommendationController.getAll
);

router.get(
  "/female",
  genderBasedRecommendationController.getTopProducts("female"),
  genderBasedRecommendationController.getAll
);

router.use(authController.protect);

router.get("/dedicated", dedicatedPredictionProductController.getAll);
router.get("/user-profile", userRecomendationsProfileController.getOne);

router.use(authController.restrictTo("admin"));
router.post("/rank", productRankController.create);
router.post("/dedicated", dedicatedPredictionProductController.create);
router.post("/gender", genderBasedRecommendationController.create);
router.post("/user-profile", userRecomendationsProfileController.create);

module.exports = router;
