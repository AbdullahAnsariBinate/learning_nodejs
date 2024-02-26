const {
  createProduct,
  getProduct,
  updateProduct,
  foo
} = require("../controllers/productControllers");
const validateToken = require("../middleware/validatejwttoken");

const router = require("express").Router();

router.route("/create-product").post(validateToken, createProduct);
router.route("/get-product").get(validateToken, getProduct);
router.route("/update-product").post(validateToken, updateProduct);

module.exports = router;
