const mongoose = require("mongoose");
const ProductPreview = require("./productPreviewModel");
const PRODUCT_SIZE_TABLE = require("../utils/productSizes");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    productPreview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPreview",
    },
    price: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    size: {
      type: String,
      enum: Object.keys(PRODUCT_SIZE_TABLE),
      required: [true, "Nie wybrano rozmiaru"],
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    barcode: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ productPreview: 1 });

productSchema.pre("save", async function (next) {
  if (this.isModified("productPreview")) {
    const productPreview = await ProductPreview.findById(this.productPreview);
    this.category = productPreview.category;
    this.name = `${productPreview.name}, roz. ${this.size}`;
    this.price = productPreview.price;
  }

  if (this.isModified("name")) {
    this.name = `${this.name}, roz. ${this.size}`;
  }
  next();
});

productSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "productPreview",
    select: "_id name description price photos imageCover slug",
    options: { _recursed: true },
  }).populate({
    path: "category",
    select: "-__v -description",
    options: { _recursed: true },
  });

  next();
});

module.exports = mongoose.model("Product", productSchema);
