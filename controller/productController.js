const handlerFactory = require('./handlerFactory');
const Product = require('./../models/productModel');

exports.getAllProduct = handlerFactory.getAll(Product);
exports.createProduct = handlerFactory.createOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.getProduct = handlerFactory.getOne(Product);
