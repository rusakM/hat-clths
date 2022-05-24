import mongoose, { mongo } from "mongoose";

interface IBooking extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId;
  address: mongoose.Types.ObjectId;
  paymentMethod: string;
  deliveryType: string;
  paid: boolean;
  total: number;
  price: number;
  createdAt: Date;
  isFinished: boolean;
  discount?: number;
  coupon?: mongoose.Types.ObjectId;
  invoice?: mongoose.Types.ObjectId;
  accessToken?: string;
}

const bookingSchema = new mongoose.Schema<IBooking>(
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
  const pizzasPromises = this.pizzas.map(async (id) => Pizza.findById(id));
  const ownPizzasPromises = this.ownPizzas.map(async (id) =>
    Pizza.findById(id)
  );
  const drinksPromises = this.drinks.map(async (id) => Product.findById(id));

  const saucesPromises = this.sauces.map(async (id) => Product.findById(id));
  const templatePromises = this.templates.map(async (id) =>
    PizzaTemplate.findById(id)
  );
  let price = 0;
  if (pizzasPromises.length) {
    price += await (await Promise.all(pizzasPromises))
      .map((pizza) => pizza.price)
      .reduce((total, val) => total + val);
  }
  if (ownPizzasPromises.length) {
    price += await (await Promise.all(ownPizzasPromises))
      .map((pizza) => pizza.price)
      .reduce((total, val) => total + val);
  }
  if (drinksPromises.length) {
    price += await (await Promise.all(drinksPromises))
      .map((product) => product.price)
      .reduce((total, val) => total + val);
  }
  if (saucesPromises.length) {
    price += await (await Promise.all(saucesPromises))
      .map((product) => product.price)
      .reduce((total, val) => total + val);
  }

  if (templatePromises.length) {
    await (
      await Promise.all(templatePromises)
    ).forEach(async (template) => {
      template.incrementCounter();
      await template.save();
    });
  }
  price = Math.round(price * 100) / 100;
  this.price = price;
  const userId = `${this.user}`;
  const time = `${Date.now()}`;
  this.barcode = `${userId.slice(
    userId.length - 6,
    userId.length
  )}-${time.slice(time.length - 6, time.length)}`;
  this.createdAt = Date.now();
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "history",
    select: "-__v",
  });

  next();
});

bookingSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -role -photo",
  })
    .populate({
      path: "pizzas",
      select: "-__v",
    })
    .populate({
      path: "ownPizzas",
      select: "-__v",
    })
    .populate({
      path: "drinks",
      select: "-__v -count -isAwailable",
    })
    .populate({
      path: "sauces",
      select: "-__v -count -isAwailable",
    })
    .populate("templates")
    .populate({
      path: "address",
      select: "-__v -user -isDefault",
    });

  next();
});

bookingSchema.post("save", async function (doc, next) {
  if (!doc.paid && !doc.isFinished) {
    const booking = doc._id;
    await BookingStatus.create({
      booking,
      description: "Utworzenie zamówienia",
    });
  }
  next();
});

const Booking = new mongoose.model("Booking", bookingSchema);

module.exports = Booking;
