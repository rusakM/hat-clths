const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
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

newsletterSchema.pre("save", async function (next) {
  const user = await User.findOne({ email: this.email });
  this.user = user._id;

  next();
});
newsletterSchema.pre("save", function (next) {
  if (this.isModified("isActiveSubscription")) {
    console.log(this);
  }
  next();
});

newsletterSchema.pre("find", function (next) {
  this.populate({
    path: "user",
    select: "_id name surname email role isGoogleUser active",
  });

  next();
});

newsletterSchema.post("save", async function (doc, next) {
  if (doc.user) {
    await User.findOneAndUpdate(
      { email: doc.email },
      { newsletter: doc.isActiveSubscription }
    );
  }
  next();
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
