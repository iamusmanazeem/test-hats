const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  surName: {
    type: String,
    maxlength: 50,
  },
  firstName:{
    type: String,
    required: true,
    maxlength: 50,
  },
  middleName:{
    type:String,
    maxlength:50
   },
   phoneNumber:{
    type:String,
    required:true,
    maxlength:50
  },
  DOB:{
    type:String,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  city: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
 street: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    surName: Joi.string().max(50),
    firstName:Joi.string().max(50).required(),
    middleName:Joi.string().max(50),
    phoneNumber:Joi.string().max(50).required(),
    DOB:Joi.string(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    city: Joi.string().min(5).max(255).required(),
    street: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
  //return Joi.validate(product, schema);
}

exports.User = User;
exports.validate = validateUser;
