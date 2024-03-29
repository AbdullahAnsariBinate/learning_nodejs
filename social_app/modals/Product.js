const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
