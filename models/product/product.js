const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    permalink: {
      type: String,
      required: true,
    },
    skuCode: {
      type: String,
      required: true,
    },
    panels: {
      type: String,
      required: true,
    },
    visor: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true,
    },
    rear: {
      type: String,
      required: true,
    },
    smallImageURL: {
      type: String,
    },
    largeImageURL: {
      type: String,
    },
    quantity: {
      type: String,
      required: true,
    },
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    permalink: Joi.string().required(),
    skuCode: Joi.string().required(),
    panels: Joi.string().required(),
    visor: Joi.string().required(),
    fabric: Joi.string().required(),
    rear: Joi.string().required(),
    smallImageURL: Joi.string(),
    largeImageURL: Joi.string(),
    quantity: Joi.String().required(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
