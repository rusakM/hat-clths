import mongoose from "mongoose";

export interface IReview extends mongoose.Document {
  createdAt: Date;
  review: string;
  rating: number;
  productPreview: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    createdAt: Date,
    review: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Należy podać ocenę"],
    },
    productPreview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPreview",
      required: [true, "Ocena musi odnosić się do konkretnego produktu"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Opinia musi odnosić się do użytkownika"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre<IReview>("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }

  next();
});

export default mongoose.model("Review", reviewSchema);
