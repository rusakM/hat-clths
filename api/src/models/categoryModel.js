const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nie podano nazwy kategorii"],
  },
  description: String,
  picture: {
    type: String,
    default: "default.png",
  },
  gender: {
    //false - woman, true - man
    type: Boolean,
    default: false,
  },
  isDeactivated: {
    type: Boolean,
    default: false,
  },
});

// categorySchema.virtual("products", {
//   ref: "ProductPreview",
//   localField: "_id",
//   foreignField: "category",
// });

categorySchema.pre("find", function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.model.find({ isDeactivated: { $eq: false } });

  return next();
});

categorySchema.pre(/^findOne/, function (next) {
  if (this.options._recursed) {
    return next();
  }

  return next();
});

export default mongoose.model("Category", categorySchema);
