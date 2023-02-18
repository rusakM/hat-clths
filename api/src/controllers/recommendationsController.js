const dedicatedPredictionProductController = require("./dedicatedPredictionProductController");
const productsRankController = require("./productsRankController");

exports.selectRecommendations = (req, res, next) => {
  if (req.user) {
    req.query.sort = "-predictionScore";
    return dedicatedPredictionProductController.getAll(req, res, next);
  }
  req.query.sort = "ranksAverage";
  return productsRankController.getAll(req, res, next);
};
