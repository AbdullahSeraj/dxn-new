const Product = require("../models/Product");
const User = require("../models/User");
const crypto = require("crypto");

const getProducts = async (req, res) => {
  const products = await Product.find();

  if (!products || products.length == 0) {
    return res.status(400).json({ message: "Not found any product" });
  }

  res.json(products);
};

const getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!productId) {
      return res.status(400).json({ message: "not found product id" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(401).json({ message: "not found this product" });
    }

    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Server error" });
  }
};

const createProduct = async (req, res) => {
  const userId = req.user;

  const {
    title,
    description,
    images,
    oldPrice,
    newPrice,
    rating,
    group,
    sizes,
    colors,
    statusProduct,
    category,
    tags,
  } = req.body;

  if (
    !title ||
    !description ||
    !images ||
    !oldPrice ||
    !newPrice ||
    !rating ||
    !category
  ) {
    return res.status(400).json({ message: "some fields are required" });
  }

  const code = (Math.random() + 1).toString(36).substring(7).toUpperCase();
  const createdBy = await User.findById(userId).select("-password");

  const product = await Product.create({
    title,
    description,
    images,
    oldPrice,
    newPrice,
    rating,
    group,
    sizes,
    colors,
    code,
    statusProduct,
    createdBy,
    category,
    tags,
  });

  if (!product) {
    return res.status(401).json({ message: "error when add product" });
  }

  res.json(product);
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: "not found product id" });
  }

  const {
    title,
    description,
    images,
    oldPrice,
    newPrice,
    rating,
    group,
    sizes,
    colors,
    category,
  } = req.body;

  if (
    !title &&
    !description &&
    !images &&
    !oldPrice &&
    !newPrice &&
    !rating &&
    !group &&
    !sizes &&
    !colors &&
    !category
  ) {
    return res.status(400).json({ message: "you don't change anything" });
  }

  try {
    const product = await Product.findByIdAndUpdate(productId, {
      title,
      description,
      images,
      oldPrice,
      newPrice,
      rating,
      group,
      sizes,
      colors,
      category,
    });

    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: "not found product id" });
  }

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(401).json({ message: "error when you delete" });
    }

    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "server error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
