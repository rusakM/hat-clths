const factory = require("./handlerFactory");
const Category = require("../models/categoryModel");
const CategoryShow = require("../models/categoryShowModel");
const ProductPreview = require("../models/productPreviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const photoSaver = require("../utils/photoSaver");

exports.createCategory = factory.createOne(Category);

exports.getCategories = factory.getAll(Category);

exports.updateCategory = factory.updateOne(Category);

exports.incrementCategoryShow = catchAsync(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  let category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return next(new AppError("Nie znaleziono kategorii", 404));
  }

  category = category.toObject();
  const categoryShowData = {
    category: category._id,
  };

  if (req.user && req.user.role !== "admin") {
    categoryShowData.user = req.user._id;
  }
  await CategoryShow.create(categoryShowData);

  next();
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return next(new AppError("Nie znaleziono kategorii", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: category,
    },
  });
});

exports.getCategoryProducts = catchAsync(async (req, res, next) => {
  let category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return next(new AppError("Nie znaleziono kategorii", 404));
  }

  category = category.toObject();

  let products = await ProductPreview.find({ category: category._id }).sort(
    "-_id"
  );

  if (!products) {
    products = [];
  }

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});

exports.uploadPhoto = photoSaver.uploadPhoto("picture");

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  await photoSaver.resizePhoto(
    req.file,
    "category",
    600,
    600,
    `${process.cwd()}/uploads/categories`,
    "webp"
  );
  req.body.picture = req.file.filename;
  next();
});

exports.getCategoryShows = factory.getAll(CategoryShow);
