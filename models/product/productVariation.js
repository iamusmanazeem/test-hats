const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const ProductVariation = mongoose.model(
  "Product Variation",
  new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockStatus: {
      type: String,
    },
    message: {
      type: String,
    },
  })
);

function validateProductVariation(productVariation) {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    categoryId: Joi.objectId().required(),
    size: Joi.string().required(),
    color: Joi.array().items(Joi.string().required()),
    price: Joi.number().required(),
    stockStatus: Joi.string(),
    message: Joi.string(),
  });

  return schema.validate(productVariation);
}

exports.ProductVariation = ProductVariation;
exports.validateProductVariation = validateProductVariation;
