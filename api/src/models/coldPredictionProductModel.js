const mongoose = require("mongoose");

const coldPredictionProductSchema = new mongoose.Schema({
  productPreview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductPreview",
  },
  similarProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductPreview",
  },
  predictionScore: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  similarProductCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: Date,
});

coldPredictionProductSchema.index({ productPreview: 1, predictionScore: -1 });

coldPredictionProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "productPreview",
    select: "_id name description price photos imageCover slug",
    options: { _recursed: true },
  })
    .populate({
      path: "similarProduct",
      select: "_id name description price photos imageCover slug",
      options: { _recursed: true },
    })
    .populate({
      path: "category",
      select: "_id name slug gender",
      options: { _recursed: true },
    })
    .populate({
      path: "similarProductCategory",
      select: "_id name slug gender",
      options: { _recursed: true },
    });

  next();
});

module.exports = mongoose.model(
  "ColdPredictionProduct",
  coldPredictionProductSchema
);
