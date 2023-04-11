const express = require('express');
const productController = require('./../controller/productController');

const productRouter = express.Router();

productRouter
  .route('/')
  .get(productController.getAllProduct)
  .post(productController.createProduct);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

module.exports = { productRouter };
