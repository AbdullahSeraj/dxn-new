const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      requried: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    group: {
      type: String,
      default: "",
    },
    sizes: {
      type: Array,
      default: [],
    },
    colors: {
      type: Array,
      default: [],
    },
    code: {
      type: String,
      required: false,
    },
    statusProduct: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Object,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
