const mongoose = require("mongoose");
const ProductPreview = require("./productPreview");

exports.PRODUCT_SIZE_TABLE = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  Universal: "Universal",
};

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Nie podano nazwy produktu"],
    },
    productPreview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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
    this.productName = `${productPreview.name}, roz. ${this.size}`;
    this.price = productPreview.price;

    const time = Date.now();
    const id = this.productPreview;
    this.barcode = `${id.slice(id.length - 6, id.length)}-${`${time}`.slice(
      `${time}`.length - 6,
      `${time}`.length
    )}`;
  }
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "productPreview",
    select: "_id name description price photos imageCover slug",
  });

  this.populate({
    path: "category",
    select: "-__v -description",
  });

  next();
});

module.exports = mongoose.model("Product", productSchema);
