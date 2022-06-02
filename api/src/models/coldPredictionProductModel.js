const mongoose = require("mongoose");

const coldPredictionProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  predictionScore: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model(
  "ColdPredictionProduct",
  coldPredictionProductSchema
);
