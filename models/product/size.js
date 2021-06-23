const mongoose = require("mongoose");
const Joi = require("joi");

const Size = mongoose.model(
  "Size",
  new mongoose.Schema({
    size: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  })
);

function validateSize(size) {
  const schema = Joi.object({
    name: Joi.required().string(),
    description: Joi.string(),
  });
  schema.validate(size);
}

exports.Size = Size;
exports.validateSize = validateSize;
