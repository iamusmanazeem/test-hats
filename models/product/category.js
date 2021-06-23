const mongoose = require("mongoose");
const Joi = require("joi");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
  })
);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.required().string(),
    description: Joi.string(),
  });

  return schema.validate(category);
}

exports.Category = Category;
exports.validateCategory = validateCategory;
