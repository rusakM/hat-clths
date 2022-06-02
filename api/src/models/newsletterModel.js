const mongoose = require("mongoose");
const validator = require("validator");

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (el) {
          return validator.isEmail(el);
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

newsletterSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name surname email role isGoogleUser active",
  });

  next();
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
