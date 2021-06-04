const mongoose = require("mongoose");
const Joi = require("joi");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    quantity: Joi.number().required(),
    price: Joi.number(),
  });

  return schema.validate(product);
  //return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
