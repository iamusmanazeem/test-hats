const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth"); // authorization
const _ = require("lodash");
const { User, validate } = require("../models/user");
const { createSuccessResponse } = require("../middleware/createResponse");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exist");

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   address: {
  //     city: req.body.city,
  //     street: req.body.street,
  //   },
  // });

  user = new User(
    _.pick(req.body, ["surName","firstName","middleName", "phoneNumber","DOB", "email", "password", "city", "street"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(
    createSuccessResponse(user)
  );
});

module.exports = router;
