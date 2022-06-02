const mongoose = require("mongoose");

const productPreviewSchema = new mongoose.Schema<IProductPreview>(
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
  foreignField: "productPreview",
  localField: "_id",
})

productPreviewSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "productPreview",
  localField: "_id",
});

productPreviewSchema
  .virtual("ratingsAverage")
  .get(function (this) {
    if (this.reviews && this.reviews.length > 0) {
      const reviewsRatings = this.reviews
        .map(({ rating }) => rating)
        .reduce((total, val) => total + val);

      this.ratingsAverage = reviewsRatings / this.reviews.length;
    } else {
      this.ratingsAverage = 0;
    }
  });

productPreviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    select: "productName size isAvailable barcode",
  }).populate({
    path: "category",
    select: "-__v",
  });

  next();
});

productPreviewSchema.pre(/^findOne/, function(next) {
  this.populate({
    path: "products",
    select: "productName size isAvailable barcode",
  }).populate({
    path: "category",
    select: "-__v",
  }).populate({
    path: "reviews",
    select: "-__v -productPreview"
  });

  next();
} )

module.exports = mongoose.model(
  "ProductPreview",
  productPreviewSchema
);
