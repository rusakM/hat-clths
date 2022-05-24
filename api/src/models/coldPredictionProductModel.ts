import mongoose from "mongoose";

export interface IColdPredictionProduct extends mongoose.Document {
  product: mongoose.Types.ObjectId;
  predictionScore: number;
  category: mongoose.Types.ObjectId;
}

const coldPredictionProductSchema = new mongoose.Schema<IColdPredictionProduct>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    predictionScore: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  }
);

export default mongoose.model(
  "ColdPredictionProduct",
  coldPredictionProductSchema
);
