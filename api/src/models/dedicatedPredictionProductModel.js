const mongoose = require("mongoose");

const dedicatedPredictionProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productPreview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPreview",
    },
    predictionScore: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

dedicatedPredictionProductSchema.index({ user: 1, ranksAverage: -1 });

dedicatedPredictionProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "_id email name role",
    options: { _recursed: true },
  }).populate({
    path: "productPreview",
    select: "_id name description price photos imageCover slug",
    options: { _recursed: true },
    populate: {
      path: "category",
      select: "_id name slug gender",
      options: { _recursed: true },
    },
  });

  next();
});

module.exports = mongoose.model(
  "DedicatedPredictionProduct",
  dedicatedPredictionProductSchema
);
