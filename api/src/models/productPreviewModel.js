const mongoose = require("mongoose");

const productPreviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nie podano nazwy produktu"],
    },
    description: {
      type: String,
      trim: true,
    },
    isDeactivated: {
      type: Boolean,
      defaule: false,
    },
    slug: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    photos: [
      {
        type: String,
      },
    ],
    imageCover: String,
    createdAt: Date,
    price: {
      type: Number,
      min: 0,
      required: [true, "Należy podać cenę produktu"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productPreviewSchema.index({ category: 1 });

productPreviewSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "productPreview",
});

productPreviewSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productPreview",
});

// productPreviewSchema
//   .virtual("ratingsAverage")
//   .get(function (this) {
//     if (this.reviews && this.reviews.length > 0) {
//       const reviewsRatings = this.reviews
//         .map(({ rating }) => rating)
//         .reduce((total, val) => total + val);

//       this.ratingsAverage = reviewsRatings / this.reviews.length;
//     } else {
//       this.ratingsAverage = 0;
//     }
//   });

productPreviewSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "category",
    select: "-__v -name -picture -gender -isDeactivated",
    options: { _recursed: true },
  });

  next();
});

productPreviewSchema.pre(/^findOne/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "products",
    select: "-__v",
    options: { _recursed: true },
  });
  this.populate({
    path: "reviews",
    select: "-__v",
    options: { _recursed: true },
    populate: {
      path: "user",
      select: "_id name",
      options: { _recursed: true },
    },
  });

  next();
});

module.exports = mongoose.model("ProductPreview", productPreviewSchema);
