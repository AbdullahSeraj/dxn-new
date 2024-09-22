const Category = require("../models/Category");
const Product = require("../models/Product");

// const getCategories = async (req, res) => {
//   try {
//     let categories = new Set([]);
//     const products = await Product.find();

//     products.forEach((pro) => {
//       categories.add(pro.category);
//     });

//     let newCategories = [];
//     categories.forEach((pro) => {
//       newCategories.push({ title: pro.charAt(0).toUpperCase() + pro.slice(1).toLowerCase(), name: pro.toLowerCase() });
//     });

//     res.json(newCategories);
//   } catch (error) {
//     res.status(404).json("Server Error");
//   }
// };

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ message: "title and name are required" });
    }

    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

const addCategory = async (req, res) => {
  const { title, name } = req.body;

  try {
    if (!title || !name) {
      return res.status(400).json({ message: "title and name are required" });
    }

    const catFound = await Category.findOne({ name });
    if (catFound) {
      return res
        .status(401)
        .json({ message: "you already have this category" });
    }

    const categories = await Category.create({
      title: title,
      name: name,
    });

    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(400)
        .json({ message: "not found this category & you already deleted" });
    }

    const products = await Product.find({ category: category.name });
    if (products.length != 0) {
      return res.status(400).json({
        message:
          "The category can't be deleted if there is a product in the same category.",
      });
    }

    const deleteCat = await Category.findByIdAndDelete(id);
    if (!deleteCat) {
      return res.status(400).json({
        message: "somthing error when delete category",
      });
    }

    res.json(deleteCat);
  } catch (error) {
    res.status(404).json({ message: "server error" });
  }
};

module.exports = { getCategories, addCategory, removeCategory };
