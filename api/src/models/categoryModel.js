const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nie podano nazwy kategorii"],
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
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("products", {
  ref: "ProductPreview",
  localField: "_id",
  foreignField: "category",
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${this.gender ? "m" : "d"}`, {
    lower: true,
  });
  next();
});

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

module.exports = mongoose.model("Category", categorySchema);
