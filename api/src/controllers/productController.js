const Product = require("../models/productModel");
const factory = require("./handlerFactory");

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.createProduct = factory.createOne(Product);

exports.deleteProduct = factory.deleteOne(Product);
