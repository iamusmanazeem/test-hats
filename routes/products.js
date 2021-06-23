const express = require("express");
const { Product, validateProduct } = require("../models/product/product");
const router = express.Router();
const _ = require("lodash");
const { createSuccessResponse } = require("../middleware/createResponse");
const { Category, validateCategory } = require("../models/product/category");
const {
  ProductVariation,
  validateProductVariation,
} = require("../models/product/productVariation");

/// Get all the products
router.get("/", async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

// create a product
router.post("/", async (req, res) => {
  let obj = _.pick(req.body, [
    "name",
    "permalink",
    "skuCode",
    "category",
    "panels",
    "visor",
    "fabric",
    "rear",
    "smallImageURL",
    "largeImageURL",
    "size",
    "color",
    "quantity",
    "price",
    "stockStatus",
    "message",
  ]);
  console.log("product in post", obj.category.length);

  //// find category id by obj.category
  // category obj

  // let categoryObj={ name: obj.category }
  //  const { categoryError } = validateProduct(categoryObj);
  //   if (categoryError) return res.status(400).send(error.details[0].message);

  // product obj
  let product;
  for (let i = 0; i < obj.category.length; i++) {
    let category = await Category.findOne({ name: obj.category[i] });
    console.log("category Id", category._id);
    let productObj = {
      name: obj.name,
      permalink: obj.permalink,
      skuCode: obj.skuCode,
      categoryId: category._id,
      panels: obj.panels,
      visor: obj.visor,
      fabric: obj.fabric,
      rear: obj.rear,
      smallImageURL: obj.smallImageURL,
      largeImageURL: obj.largeImageURL,
    };
    let { productError } = validateProduct(productObj);
    if (productError) return res.status(400).send(error.details[0].message);

    product = new Product(productObj);

    product = await product.save();
  }

  console.log("here");
  // product variation obj
  let productVariations;
  for (let i = 0; i < obj.color.length; i++) {
    let productVariationsObj = {
      productId: product._id,
      size: obj.size,
      color: obj.color[i],
      quantity: obj.quantity,
      price: obj.price,
      stockStatus: obj.stockStatus,
      message: obj.message,
    };
    const { productVariationsError } =
      validateProductVariation(productVariationsObj);
    if (productVariationsError)
      return res.status(400).send(error.details[0].message);
    productVariations = new ProductVariation(productVariationsObj);

    await productVariations.save();
  }

  res.send(createSuccessResponse(product));
});

//update a product
router.put("/:id", async (req, res) => {
  const { error } = validateProduct(req.body);
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

  res.send(createSuccessResponse(product));
});

// get a product by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("The product of the given id is not found");
  }
  res.send(createSuccessResponse(product));
});

// delete a product
router.delete("/:id", async (req, res) => {
  const product = await Product.findOneAndRemove(req.params.id);
  if (!product) {
    return res.status(404).send("The product of the given id is not found");
  }
  res.send(createSuccessResponse(product));
});

// Get a Product by category

// router.get("/:category",async(req,res)=>{
//   const product = await Product.findById(req.);
//   if (!product) {
//     return res.status(404).send("The product of the given id is not found");
//   }
//   res.send(createSuccessResponse(product));
// })

module.exports = router;
