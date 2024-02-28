const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const isRole = require("../middleware/isRole");
const validateToken = require("../middleware/validatejwttoken");

const router = require("express").Router();

router.route("/create-category").post(validateToken, isRole, createCategory);
router.route("/get-category").get(validateToken, getCategory);
router
  .route("/delete-category/:id")
  .delete(validateToken, isRole, deleteCategory);

module.exports = router;
