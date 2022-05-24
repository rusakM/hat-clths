import mongoose from "mongoose";

export interface IProductBought extends mongoose.Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  productPreview: mongoose.Types.ObjectId;
  quantity: number;
}

const productBoughtSchema = new mongoose.Schema<IProductBought>(
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productBoughtSchema.index({ product: 1 });

export default mongoose.model<IProductBought>(
  "ProductBought",
  productBoughtSchema
);
