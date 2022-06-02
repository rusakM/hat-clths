const mongoose = require("mongoose");
const md5 = require("md5");
const BookingStatus = require("./bookingStatusModel");
const Product = require("./productModel");
const Coupon = require("./couponModel");
const User = require("./userModel");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Zamówienie musi należeć do użytkownika"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Zamówienie musi posiadać prznajmniej jeden produkt"],
      },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Zamówienie musi posiadać adres dostawy"],
    },
    paymentMethod: {
      type: String,
      enum: ["przy odbiorze", "online"],
      default: "online",
    },
    deliveryType: {
      type: String,
      enum: ["kurier", "przesyłka pocztowa", "paczkomat"],
      required: [true, "Nie wybrano sposobu dostawy"],
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

bookingSchema.pre("save", async function (next) {
  if (this.isNew) {
    const productsPromises = this.products.map(async (id) =>
      Product.findById(id)
    );

    const products = await await Promise.all(productsPromises);
    let price = products
      .map(({ price }) => price)
      .reduce((total, val) => total + val);
    this.price = Math.round(price * 100) / 100;

    if (this.coupon) {
      const coupon = await Coupon.findById(this.coupon);
      this.discount = coupon.discount;
      price -= (coupon.discount / 100) * price;
    }

    price = Math.round(price * 100) / 100;
    this.total = price;

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
  this.populate({
    path: "history",
    select: "-__v",
  }).populate({
    path: "user",
    select: "name surname email isGoogleUser",
  });

  next();
});

bookingSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "user",
    select: "name surname email isGoogleUser",
  })
    .populate({
      path: "products",
      select: "-__v",
    })
    .populate({
      path: "address",
      select: "-__v",
    })
    .populate({
      path: "coupon",
      select: "-__v",
    })
    .populate({
      path: "invoice",
      select: "-__v",
    })
    .populate({
      path: "history",
      select: "-__v",
    });

  next();
});

bookingSchema.post("save", async function (doc, next) {
  if (doc.createdAt + 10000 < Date.now()) {
    return next();
  }

  const productsPromises = doc.products.map(async (id) => Product.findById(id));

  const products = await await Promise.all(productsPromises);
  const productsQuantities = doc.products.reduce((total, val) => {
    return total[val] ? ++total[val] : (total[val] = 1), total;
  }, {});

  for (const id in productsQuantities) {
    let product;

    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        product = products[i];
        break;
      }
    }

    const productBoughtToInsert = {
      product: id,
      user: doc.user,
      category: product.category,
      booking: doc._id,
      productPreview: product.productPreview,
      quantity: productsQuantities[id],
    };

    console.log(productBoughtToInsert);

    if (!doc.paid && !doc.isFinished) {
      const booking = doc._id;
      await BookingStatus.create({
        booking,
        description: "Utworzenie zamówienia",
      });
    }
  }

  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
