const randomstring = require("randomstring");
const Product = require("../models/productModel");
const ProductPreview = require("../models/productPreviewModel");
const ProductShow = require("../models/productShowModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const photoSaver = require("../utils/photoSaver");
const factory = require("./handlerFactory");
const PRODUCT_SIZE_TABLE = require("../utils/productSizes");
const uniqueSet = require("../utils/uniqueSet");

exports.getProduct = factory.getOne(ProductPreview);

exports.getProducts = factory.getAll(ProductPreview);

exports.limitNewProducts = (req, res, next) => {
  if (!req.query.limit) {
    req.query.limit = 25;
  }
  next();
};

exports.sortNewProducts = (req, res, next) => {
  if (!req.query.sort) {
    req.query.sort = "-_id";
  }
  next();
};

exports.createProduct = catchAsync(async (req, res, next) => {
  const productPreview = await ProductPreview.create(req.body);

  if (!productPreview) {
    return next(new AppError("Nie można utworzyć produktu", 404));
  }

  const sizes =
    req.body.sizes && req.body.sizes.length
      ? req.body.sizes
      : [PRODUCT_SIZE_TABLE.Universal];

  const products = sizes.map((size) => {
    const time = `${Date.now()}`;
    const pId = `${productPreview._id}`;
    return {
      name: `${req.body.name}, roz. ${size} `,
      size,
      price: req.body.price,
      category: req.body.category,
      productPreview: pId,
      barcode: `${size.length === 1 ? `${size}0` : size.slice(0, 2)}${pId.slice(
        pId.length - 4,
        pId.length
      )}-${time.slice(time.length - 5, time.length)}${randomstring.generate({
        length: 1,
        charset: "alphabetic",
      })}`.toUpperCase(),
    };
  });

  const productsInserted = await Product.insertMany(products);

  res.status(200).json({
    status: "success",
    data: {
      data: {
        ...productPreview.toObject(),
        products: productsInserted,
      },
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  let productPreview = await ProductPreview.findById(req.params.id);
  if (!productPreview) {
    return next(new AppError("Błąd aktualizacji produktu", 404));
  }

  productPreview = productPreview.toObject();

  if (req.body.photos) {
    req.body.photos = [
      ...new Set(productPreview.photos.concat(req.body.photos)),
    ];
  }

  productPreview = await ProductPreview.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  req.productPreview = productPreview.toObject();
  next();
});

exports.updateAssociatedProducts = catchAsync(async (req, res, next) => {
  const productUpdate = {};

  if (req.body.price) {
    productUpdate.price = req.body.price;
  }

  if (req.body.name) {
    productUpdate.name = req.body.name;
  }

  if (req.body.category) {
    productUpdate.category = req.body.category;
  }

  if (req.body.isDeactivated === false || req.body.isDeactivated === true) {
    productUpdate.isDeactivated = req.body.isDeactivated;
  }

  await Product.updateMany(
    { productPreview: req.productPreview._id },
    productUpdate
  );

  const productPreview = await ProductPreview.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      data: productPreview,
    },
  });
});

exports.createNewSize = catchAsync(async (req, res, next) => {
  let productPreview = await ProductPreview.findById(req.params.id);

  if (!productPreview) {
    return next(new AppError("Nie można znaleźć produktu", 404));
  }

  productPreview = productPreview.toObject();

  if (
    productPreview.products
      .map((product) => product.size)
      .find((size) => size === req.body.size)
  ) {
    return next(new AppError("Podany rozmiar już istnieje", 404));
  }

  const newProduct = await Product.create({
    name: `${productPreview.name}, roz. ${req.body.size}`,
    price: productPreview.price,
    productPreview: req.params.id,
    category: productPreview.category._id,
    size: req.body.size,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: newProduct,
    },
  });
});

exports.toggleProductSizeDisability = catchAsync(async (req, res, next) => {
  const disableSize = await Product.findOneAndUpdate(
    { size: req.body.size, productPreview: req.params.id },
    { isDeactivated: req.body.isDeactivated }
  );

  if (!disableSize) {
    return next(new AppError("Nie znaleziono produktu", 404));
  }

  const productPreview = await ProductPreview.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      data: productPreview,
    },
  });
});

exports.toggleProductDisability = catchAsync(async (req, res, next) => {
  let productPreview = await ProductPreview.findById(req.params.id);

  if (!productPreview) {
    return next(new AppError("Nie znaleziono produktu", 404));
  }

  await Product.updateMany(
    { productPreview: req.params.id },
    { isDeactivated: req.body.isDeactivated }
  );
  productPreview = await ProductPreview.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      data: productPreview,
    },
  });
});

exports.removePhoto = catchAsync(async (req, res, next) => {
  let productPreview = await ProductPreview.findById(req.params.id);

  if (!productPreview) {
    return next(new AppError("Nie znaleziono produktu"));
  }

  productPreview = productPreview.toObject();

  const productUpdate = {};

  if (!productPreview.photos.find((photo) => photo === req.body.photo)) {
    return next(new AppError("Nie znaleziono obrazka", 404));
  }

  productUpdate.photos = productPreview.photos.filter(
    (photo) => photo !== req.body.photo
  );

  if (req.body.photo === productPreview.imageCover) {
    if (
      req.body.imageCover &&
      productUpdate.find((photo) => photo === req.body.imageCover)
    ) {
      productUpdate.imageCover = req.body.imageCover;
    } else if (productUpdate.photos.length) {
      productUpdate.imageCover = productUpdate.photos[0];
    } else {
      productUpdate.imageCover = "default.png";
    }
  }

  productPreview = await ProductPreview.findByIdAndUpdate(
    req.params.id,
    productUpdate
  );

  res.status(200).json({
    status: "success",
    data: {
      data: productPreview,
    },
  });
});

exports.uploadPhotos = photoSaver.uploadPhotos("pictures");

exports.resizePhotos = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  const filenames = [];

  for (let i = 0; i < req.files.length; i++) {
    await photoSaver.resizePhoto(
      req.files[i],
      "product",
      900,
      1200,
      `${process.cwd()}/uploads/products`,
      "webp"
    );

    filenames.push(req.files[i].filename);
  }

  req.body.photos = filenames.flat();

  next();
});

exports.selectCoverPhoto = (req, res, next) => {
  if (req.body.photos && req.body.photos.length === 0) {
    req.body.photos = undefined;
  }

  if (!req.body.imageCover && !req.body.photos) {
    return next();
  } else if (!req.body.imageCover && req.body.photos) {
    req.body.imageCover = req.body.photos[0];
  } else if (req.body.imageCover && !req.body.photos) {
    return next();
  } else {
    if (req.body.imageCover >= req.body.photos.length) {
      if (
        typeof req.body.imageCover === "string" &&
        req.body.imageCover.length > 10
      ) {
        return next();
      }
      req.body.imageCover = req.body.photos[0];
    } else {
      req.body.imageCover = req.body.photos[req.body.imageCover];
    }
  }

  next();
};

exports.prepareProduct = (req, res, next) => {
  if (req.body.price) {
    req.body.price *= 1;
  }

  if (req.body.sizes) {
    req.body.sizes = req.body.sizes.split(",");
  }

  next();
};

exports.showProduct = catchAsync(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  const productPreview = await ProductPreview.findById(req.params.id);

  if (!productPreview) {
    return next(new AppError("Nie znaleziono produktu", 404));
  }

  const productShowData = {
    productPreview: req.params.id,
  };

  if (req.user && req.user.role !== "admin") {
    productShowData.user = req.user._id;
  }

  await ProductShow.create(productShowData);

  next();
});

exports.indicateForHim = (req, res, next) => {
  req.query.gender = true;

  next();
};

exports.getProductsByGender = catchAsync(async (req, res, next) => {
  const gender = req.query.gender || false;
  let productsList = await ProductPreview.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        category: {
          _id: 1,
          name: 1,
          slug: 1,
          gender: 1,
        },
        price: 1,
        imageCover: 1,
        isAvailable: 1,
      },
    },
    {
      $unwind: "$category",
    },

    {
      $set: {
        gender: "$category.gender",
        categoryId: "$category._id",
      },
    },
    {
      $match: {
        $and: [{ isAvailable: true }, { gender }],
      },
    },
    {
      $sort: { categoryId: 1, id: 1 },
    },
  ]);

  const categoriesList = productsList.map((product) => product.categoryId);
  const categories = uniqueSet.createSet(categoriesList);
  productsList = categories
    .map((category) =>
      productsList
        .filter((product) => `${product.category._id}` === `${category}`)
        .slice(0, 3)
    )
    .flat();

  res.status(200).json({
    status: "success",
    results: productsList.length,
    data: {
      data: productsList,
    },
  });
});

exports.getAllProductShows = factory.getAll(ProductShow);
