const mongoose = require("mongoose");
const md5 = require("md5");
const BookingStatus = require("./bookingStatusModel");
const Product = require("./productModel");
const Coupon = require("./couponModel");
const User = require("./userModel");
const delivery = require("../utils/deliveryTypes");
const bookingStatuses = require("../utils/bookingStatuses");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Zamówienie musi należeć do użytkownika"],
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Zamówienie musi posiadać adres dostawy"],
    },
    paymentMethod: {
      type: Boolean,
      default: true,
    },
    deliveryType: {
      type: String,
      enum: Object.keys(delivery.DELIVERY_TYPES),
      required: [true, "Nie wybrano sposobu dostawy"],
    },
    deliveryCost: {
      type: Number,
      min: 0,
      default: 14.99,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      min: 0,
    },
    price: {
      type: Number,
      min: 0,
    },
    createdAt: {
      type: Date,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    accessToken: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.index({ user: 1, createdAt: -1 });

bookingSchema.virtual("history", {
  ref: "BookingStatus",
  foreignField: "booking",
  localField: "_id",
});

bookingSchema.virtual("products", {
  ref: "ProductBought",
  foreignField: "booking",
  localField: "_id",
});

bookingSchema.pre("save", async function (next) {
  if (this.isNew) {
    const time = Date.now();
    this.createdAt = time;

    const user = await User.findById(this.user);
    if (!user.active) {
      this.accessToken = md5(time);
    }
  }

  next();
});

bookingSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }

  this.populate({
    path: "history",
    select: "-__v",
    options: { _recursed: true },
  }).populate({
    path: "user",
    select: "name surname email isGoogleUser",
    options: { _recursed: true },
  });

  next();
});

bookingSchema.pre(/^findOne/, function (next) {
  if (this.options._recursed) {
    return next();
  }

  this.populate({
    path: "products",
    select: "-__v",
    options: { _recursed: true },
  })
    .populate({
      path: "address",
      select: "-__v",
      options: { _recursed: true },
    })
    .populate({
      path: "coupon",
      select: "-__v",
      options: { _recursed: true },
    })
    .populate({
      path: "invoice",
      select: "-__v",
      options: { _recursed: true },
    });

  next();
});

bookingSchema.post("save", async function (doc, next) {
  if (doc.createdAt + 10000 < Date.now()) {
    return next();
  }

  if (!doc.paid && !doc.isFinished) {
    const booking = doc._id;
    await BookingStatus.create({
      booking,
      description: bookingStatuses.create,
    });
  }

  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
