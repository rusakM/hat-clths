import mongoose from "mongoose";
import validator from "validator";

export interface INewsletter extends mongoose.Document {
  email: string;
  user: mongoose.Types.ObjectId;
  isActiveSubscription: boolean;
}

const newsletterSchema = new mongoose.Schema<INewsletter>(
  {
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (el: String) {
          return validator.isEmail(`${el}`);
        },
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActiveSubscription: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

newsletterSchema.pre<INewsletter>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name surname email role isGoogleUser",
  });

  next();
});

export default mongoose.model<INewsletter>("Newsletter", newsletterSchema);
