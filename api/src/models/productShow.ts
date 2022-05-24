import mongoose from "mongoose";

export interface IProductShow extends mongoose.Document {
  productPreview: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  category: mongoose.Types.ObjectId;
}

const productShowSchema = new mongoose.Schema<IProductShow>(
  {
    productPreview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPreview",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: Date,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productShowSchema.index({ productPreview: 1 });

productShowSchema.pre<IProductShow>("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }

  next();
});

export default mongoose.model<IProductShow>("ProductShow", productShowSchema);
