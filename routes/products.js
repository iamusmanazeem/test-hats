const express = require("express");
const { Product, validate } = require("../models/product");
const router = express.Router();
/// Get all the products
router.get("/", async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

// create a product
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  });

  product = await product.save();
  res.send(product);
});

//update a product
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    },
    {
      new: true,
    }
  );

  if (!product) {
    return res.status(404).send("The product of the given id is not found");
  }

  res.send(product);
});

// get a product by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("The product of the given id is not found");
  }
  res.send(product);
});

// delete a product
router.delete("/:id", async (req, res) => {
  const product = await Product.findOneAndRemove(req.params.id);
  if (!product) {
    return res.status(404).send("The product of the given id is not found");
  }
  res.send(product);
});

module.exports = router;
