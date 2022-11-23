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
    price: Number,
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productBoughtSchema.index({ product: 1 });

productBoughtSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }

  next();
});

productBoughtSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }

  this.populate({
    path: "product",
    select: "_id id name price imageCover",
    options: { _recursed: true },
  })
    .populate({
      path: "productPreview",
      select: "_id id name price size barcode",
      options: { _recursed: true },
    })
    .populate({
      path: "category",
      select: "-__v",
      options: { _recursed: true },
    })
    .populate({
      path: "user",
      select: "_id id email name role",
      options: { _recursed: true },
    });

  next();
});

module.exports = mongoose.model("ProductBought", productBoughtSchema);
