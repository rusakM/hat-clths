import mongoose from "mongoose";

export interface IDedicatedPredictionProduct extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  predictionScore: number;
  category: mongoose.Types.ObjectId;
}

const dedicatedPredictionProductSchema =
  new mongoose.Schema<IDedicatedPredictionProduct>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    predictionScore: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  });

export default mongoose.model(
  "DedicatedPredictionProduct",
  dedicatedPredictionProductSchema
);
