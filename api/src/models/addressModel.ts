import mongoose from "mongoose";
import validator from "validator";
import userModel from "./userModel";

const zipCodeValidator = new RegExp(/^([0-9]{2})(-[0-9]{3})?$/i);
const cityValidator = new RegExp(
  /^[A-ZĆŁÓŚŹŻ][a-ząćęłńóśźż]+(?:[\s-][A-ZĆŁÓŚŹŻ][a-ząćęłńóśźż]+)*$/
);
const houseNumberValidator = new RegExp(/^\d+[a-zA-Z]*$/);

export interface IAddress extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  city: string;
  zipCode: string;
  street: string;
  houseNumber: string;
  flatNumber?: number;
  phoneNumber: string;
  isDefault: boolean;
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Adres musi być przypisany do użytkownika"],
    },
    city: {
      type: String,
      trim: true,
      validate: {
        validator: function (el: string) {
          return cityValidator.test(el);
        },
        message: "Podana nazwa miasta jest nieprawidłowa",
      },
      required: [true, "Należy podać nazwę miasta"],
    },
    zipCode: {
      type: String,
      trim: true,
      required: [true, "Należy podać kod pocztowy"],
      validate: {
        validator: function (el: string) {
          return zipCodeValidator.test(el);
        },
        message: "Podany kod pocztowy jest nieprawidłowy",
      },
    },
    street: {
      type: String,
      required: [true, "Należy podać nazwę ulicy"],
      trim: true,
      validate: {
        validator: function (el: string) {
          return cityValidator.test(el);
        },
        message: "Podana nazwa ulicy jest nieprawidłowa",
      },
    },
    houseNumber: {
      type: String,
      required: [true, "Należy podać numer domu"],
      trim: true,
      validate: {
        validator: function (el: string) {
          return houseNumberValidator.test(el);
        },
        message: "Numer domu jest nieprawidłowy",
      },
    },
    flatNumber: {
      type: Number,
      min: 1,
    },
    phoneNumber: {
      type: String,
      required: [true, "Należy podać numer telefonu"],
      validate: {
        validator: function (el: string) {
          return validator.isMobilePhone(el, "pl-PL");
        },
      },
    },
    isDefault: Boolean,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

addressSchema.pre<IAddress>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -role -photo",
  });
  next();
});

export default mongoose.model("Address", addressSchema);
