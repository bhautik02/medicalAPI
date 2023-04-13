const handlerFactory = require('./handlerFactory');
const Product = require('./../models/productModel');
const mongoose = require('mongoose');

exports.getAllProduct = handlerFactory.getAll(Product);
exports.createProduct = handlerFactory.createOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.getProduct = handlerFactory.getOne(Product);

exports.getProductByProductType = async (req, res, next) => {
  try {
    console.log(req.params.productType);
    let product = await Product.aggregate([
      {
        $match: {
          productType: new mongoose.Types.ObjectId(req.params.productType),
        },
      },
      {
        $unwind: {
          path: '$Match',
          preserveNullAndEmptyArrays: true,
        },
      },
      //   {
      //     $lookup: {
      //       from: 'Producttype',
      //       localField: 'productType',
      //       foreignField: '_id',
      //       as: 'result',
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: '$result',
      //       preserveNullAndEmptyArrays: true,
      //     },
      //   },
      //   {
      //     $project: {
      //       name: 1,
      //       result: {
      //         productType: 1,
      //       },
      //     },
      //   },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        data: product,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.mostRecentProduct = async (req, res, next) => {
  try {
    const product = await Product.find(
      {},
      {
        _id: 1,
        productName: 1,
        productType: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: {
        product: product[0],
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
