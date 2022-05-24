import mongoose from "mongoose";

export interface ICategoryShow extends mongoose.Document {
  category: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const categoryShowSchema = new mongoose.Schema<ICategoryShow>(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categoryShowSchema.index({ category: 1, createdAt: -1 });

categoryShowSchema.pre<ICategoryShow>("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }
  next();
});

export default mongoose.model<ICategoryShow>(
  "CategoryShow",
  categoryShowSchema
);
