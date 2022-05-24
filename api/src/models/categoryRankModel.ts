import mongoose from "mongoose";

export interface ICategoryRank extends mongoose.Document {
  category: mongoose.Types.ObjectId;
  rank: number;
}

const categoryRankSchema = new mongoose.Schema<ICategoryRank>({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  rank: Number,
});

export default mongoose.model("CategoryRank", categoryRankSchema);
