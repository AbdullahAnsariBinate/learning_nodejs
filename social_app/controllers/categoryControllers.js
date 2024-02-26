const { json } = require("express");
const Category = require("../modals/Category");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqcppc6et",
  api_key: "222887894591324",
  api_secret: "vhGlJPcESZr5az53_OyQu0YTU4s",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tesingFolder",
    allowed_formats: ["jpeg", "jpg", "png"],
  },
});
const parser = multer({
  storage: storage,
});
const createCategory = async (req, res) => {
  try {
    parser.single("image")(req, res, async (err) => {
      if (err) {
        res
          .status(400)
          .json({ statusCode: false, message: "Images uploading failed!" });
        return;
      }

      const { categoryName } = req.body;
      const imageUrl = req.file ? req.file?.path : "";
      const newCategory = new Category({
        categoryName,
        image: imageUrl,
      });
      await newCategory.save();
      res
        .status(200)
        .json({ message: "Create Category Successfully!", statusCode: 200 });
    });
  } catch (err) {
    console.log("🚀 ~ createCategory ~ err:", err);
    res.status(500).json({ message: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const getCategories = await Category.find();
    res.status(200).json({ getCategories });
  } catch (err) {
    console.log("🚀 ~ getCategory ~ err:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.param;
    await Category.deleteOne({ id });
    console.log("deletedCategorydeletedCategory", deletedCategory);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ message: "Category not found", statusCode: 404 });
    }
    res
      .status(200)
      .json({ message: "Category has been deleted!", statusCode: 200 });
  } catch (err) {
    console.log("🚀 ~ deleteCategory ~ err:", err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { createCategory, getCategory, deleteCategory };
