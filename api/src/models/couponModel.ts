import mongoose from "mongoose";

export interface ICoupon extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  couponCode: string;
  discount: number;
  createdAt: Date;
  expires: Date;
  isUsed: boolean;
}

const couponSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Należy przypisać kupon do użytkownika"],
    },
    couponCode: {
      type: String,
      required: [true, "Nie przypisano numeru kuponu"],
    },
    createdAt: Date,
    expires: Date,
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

couponSchema.pre<ICoupon>("save", function (next) {
  if (this.isNew) {
    const time = Date.now();

    const userId = `${this.user}`;
    this.couponCode = `${userId.slice(
      userId.length - 6,
      userId.length
    )}-${`${time}`.slice(`${time}`.length - 6, `${time}`.length)}`;
    this.createdAt = new Date(time);
    this.expires = new Date(this.expires.getTime() + time);
  }
  next();
});

couponSchema.pre<ICoupon>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name surname email role isGoogleUser",
  });

  next();
});

export default mongoose.model<ICoupon>("Coupon", couponSchema);
