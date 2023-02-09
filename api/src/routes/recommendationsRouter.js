const express = require("express");
const dedicatedPredictionProductController = require("../controllers/dedicatedPredictionProductController");
const coldPredictionProductController = require("../controllers/coldPredictionProductController");
const productRankController = require("../controllers/productsRankController");
const authController = require("../controllers/authController");

const router = express.Router();

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

router.get("/cold/:id", coldPredictionProductController.getSimilar);
router.get("/rank", productRankController.getAll);
router.get(
  "/rank/top20",
  productRankController.getTop20Products,
  productRankController.getAll
);

router.use(authController.protect);

router.get("/dedicated", dedicatedPredictionProductController.getAll);

router.use(authController.restrictTo("admin"));
router.post("/rank", productRankController.create);
router.post("/dedicated", dedicatedPredictionProductController.create);

module.exports = router;
