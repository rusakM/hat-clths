import mongoose from "mongoose";
import { IReview } from "./reviewModel";
import ProductShow from "./productShow";

export interface IProductPreview extends mongoose.Document {
  name: string;
  products: Array<mongoose.Types.ObjectId>;
  description?: string;
  reviews?: Array<IReview>;
  ratingsAverage?: number;
  isDeactivated: boolean;
  boughts?: number;
  productShows?: number;
  slug: string;
  category: mongoose.Types.ObjectId;
  photos?: Array<string>;
  imageCover?: string;
  createdAt: Date;
  price: number;
  isAvailable: boolean;
}

const productPreviewSchema = new mongoose.Schema<IProductPreview>(
  {
    name: {
      type: String,
      required: [true, "Nie podano nazwy produktu"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
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

productPreviewSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "productPreview",
  localField: "_id",
});

// productPreviewSchema.virtual("productShows", {
//   ref: "ProductShow",
//   foreignField: "productPreview",
//   localField: "_id",
//   count: true,
// });

productPreviewSchema
  .virtual("ratingsAverage")
  .get(function (this: IProductPreview) {
    if (this.reviews && this.reviews.length > 0) {
      const reviewsRatings = this.reviews
        .map(({ rating }: IReview) => rating)
        .reduce((total, val) => total + val);

      this.ratingsAverage = reviewsRatings / this.reviews.length;
    } else {
      this.ratingsAverage = 0;
    }
  });

productPreviewSchema.pre<IProductPreview>(/^find/, async function (next) {
  this.populate({
    path: "products",
    select: "productName size isAvailable barcode",
  });

  this.populate({
    path: "category",
    select: "-__v",
  });
});

export default mongoose.model<IProductPreview>(
  "ProductPreview",
  productPreviewSchema
);
