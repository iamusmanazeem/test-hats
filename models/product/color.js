const mongoose = require("mongoose");
const joi = require("joi");

const Color = mongoose.model(
  "Color",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  })
);

function validateColor(color) {
  const schema = Joi.object({
    name: joi.required().string(),
    description: joi.string(),
  });

  schema.validate(color);
}

exports.Color = Color;
exports.validateColor = validateColor;
