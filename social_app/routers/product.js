const { createProduct } = require("../controllers/productControllers");
const validateToken = require("../middleware/validatejwttoken");

const router = require("express").Router();

router.route("/create-product").post(validateToken, createProduct);

module.exports = router;
