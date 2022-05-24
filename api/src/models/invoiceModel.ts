import mongoose from "mongoose";

export interface IInvoice extends mongoose.Document {
  address: mongoose.Types.ObjectId;
  nip: string;
  company: string;
  user: mongoose.Types.ObjectId;
}

const invoiceSchema = new mongoose.Schema<IInvoice>(
  {
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Nie podano adresu do faktury"],
    },
    nip: {
      type: String,
      required: [true, "Nie podano numeru NIP"],
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

invoiceSchema.pre<IInvoice>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name surname email role isGoogleUser",
  });

  this.populate({
    path: "address",
    select: "-__v",
  });

  next();
});

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);
