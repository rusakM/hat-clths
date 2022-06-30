const factory = require("./handlerFactory");
const Category = require("../models/categoryModel");
const CategoryShow = require("../models/categoryShow");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const photoSaver = require("../utils/photoSaver");

exports.createCategory = factory.createOne(Category);

exports.getCategories = factory.getAll(Category);

exports.updateCategory = factory.updateOne(Category);

exports.incrementCategoryShow = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.name });

  if (!category) {
    return next(new AppError("Nie znaleziono kategorii", 404));
  }

  category = category.toObject();
  const categoryShowData = {
    category: category._id,
  };

  if (req.user) {
    categoryShowData.user = req.user._id;
  }
  await CategoryShow.create(categoryShowData);

  next();
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.name });

  if (!cateory) {
    return next(new AppError("Nie znaleziono kategorii", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: category,
    },
  });
});
