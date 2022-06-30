const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Należy przypisać kupon do użytkownika"],
    },
    couponCode: {
      type: String,
    },
    discount: {
      type: Number,
      min: 1,
      max: 100,
      default: 5,
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

couponSchema.index({ user: 1 });

couponSchema.pre("save", function (next) {
  if (this.isNew) {
    const time = Date.now();

    const userId = this.user.toString();
    this.couponCode = `${userId.slice(
      userId.length - 6,
      userId.length
    )}-${`${time}`.slice(`${time}`.length - 6, `${time}`.length)}`;
    this.createdAt = new Date(time);
    this.expires = new Date(time + this.expires.getTime());
  }
  next();
});

couponSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }

  this.populate({
    path: "user",
    select: "name surname email role isGoogleUser",
    options: { _recursed: true },
  });

  next();
});

module.exports = mongoose.model("Coupon", couponSchema);
