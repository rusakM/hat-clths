const mongoose = require("mongoose");

const productsRankSchema = new mongoose.Schema({
  productPreview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductPreview",
  },
  ranksAverage: Number,
  gender: Boolean,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: Date,
});

productsRankSchema.index({ productPreview: 1, ranksAverage: -1 });

productsRankSchema.pre(/^find/, function (next) {
  this.populate({
    path: "productPreview",
    select: "_id name description price photos imageCover slug",
    options: { _recursed: true },
  }).populate({
    path: "category",
    select: "_id name slug gender",
    options: { _recursed: true },
  });

  next();
});

module.exports = mongoose.model("ProductsRank", productsRankSchema);
