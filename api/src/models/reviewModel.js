const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
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

reviewSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date(Date.now());
  }

  next();
});

reviewSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }

  this.populate({
    path: "user",
    select: "-__v",
    options: { _recursed: true },
  });

  next();
});

module.exports = mongoose.model("Review", reviewSchema);
