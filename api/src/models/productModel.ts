import mongoose from "mongoose";
import ProductPreview from "./productPreview";

export interface IProduct extends mongoose.Document {
  productName: string;
  productPreview: mongoose.Types.ObjectId;
  price: number;
  categoryName: mongoose.Types.ObjectId;
  size: string;
  isDeactivated: boolean;
  productBoughts?: number;
  isAvailable: boolean;
  barcode: string;
}

export const PRODUCT_SIZE_TABLE = {
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

productSchema.pre<IProduct>(/^find/, function (next) {
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

export default mongoose.model<IProduct>("Product", productSchema);
