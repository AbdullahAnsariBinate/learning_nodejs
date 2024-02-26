const Product = require("../modals/Product");
const Category = require("../modals/Category");
const parser = require("../middleware/cloudinaryStorage");

const createProduct = (req, res) => {
  try {
    parser.array("images", 10)(req, res, async (err) => {
      if (err) {
        res
          .status(400)
          .json({ statusCode: false, message: "Images uploading failed!" });
        return;
      }
    });

    console.log(req?.file, "filesssss");
    res.status(200);
  } catch (err) {
    console.log("🚀 ~ createProduct ~ err:", err);
  }
};

module.exports = { createProduct };
