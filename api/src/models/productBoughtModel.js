const mongoose = require("mongoose");

const productBoughtSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    productPreview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPreview",
    },
    quantity: {
      type: Number,
      min: 1,
    },
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productBoughtSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }

  next();
});

productBoughtSchema.index({ product: 1 });

module.exports = mongoose.model("ProductBought", productBoughtSchema);
