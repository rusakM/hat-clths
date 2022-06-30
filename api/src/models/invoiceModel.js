const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Nie podano adresu do faktury"],
    },
    nip: {
      type: String,
      required: [true, "Nie podano numeru NIP"],
      length: [9, "Nieprawidłowa długość numeru NIP"],
    },
    company: {
      type: String,
      required: [true, "Nie podano nazwy firmy"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

invoiceSchema.index({ user: 1, address: 1 });

invoiceSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: "user",
    select: "name surname email role isGoogleUser",
    options: { _recursed: true },
  }).populate({
    path: "address",
    select: "-__v -user",
    options: { _recursed: true },
  });

  next();
});

module.exports = mongoose.model("Invoice", invoiceSchema);
