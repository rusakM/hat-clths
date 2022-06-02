const mongoose = require("mongoose");

const dedicatedPredictionProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  "DedicatedPredictionProduct",
  dedicatedPredictionProductSchema
);
