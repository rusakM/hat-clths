const ProductBought = require("../models/productBoughtModel");
const factory = require("./handlerFactory");

exports.getAllProductBoughts = factory.getAll(ProductBought);
