const Product = require("../models/productModel");
const factory = require("./handlerFactory");

exports.getProduct = factory.getOne(Product);

exports.createProduct = factory.createOne(Product);

exports.deleteProduct = factory.deleteOne(Product);
