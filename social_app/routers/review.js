const { createArticle } = require("../controllers/articleController");
const isRole = require("../middleware/isRole");

const validateToken = require("../middleware/validatejwttoken");

const router = require("express").Router();

router.route("/create-article").post(validateToken, createArticle);
//   router.route("/get-product").get(validateToken, getProduct);
//   router.route("/update-product").put(validateToken, isRole, updateProduct);
//   router
//     .route("/delete-product/:id")
//     .delete(validateToken, isRole, deleteProduct);

module.exports = router;
