const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      required: true,
      enum: ['capsule'],
    },
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A product name must have less or equal then 40 characters',
      ],
      minlength: [
        5,
        'A product name must have more or equal then 10 characters',
      ],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },

    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      trim: true,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    // contains: {
    //   type: String,
    //   trim: true,
    //   required: [true, 'A product must have a list of element conatins'],
    // },
    imageCover: {
      type: String,
      //   required: [true, 'A product must have a cover image'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
