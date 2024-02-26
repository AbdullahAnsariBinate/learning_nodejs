const { createCategory,getCategory, deleteCategory } = require("../controllers/categoryControllers");
const validateToken = require("../middleware/validatejwttoken");

const router = require("express").Router();

router.route("/create-category").post(validateToken,createCategory);
router.route("/get-category").get(validateToken,getCategory);
router.route("/delete-category/:id").delete(validateToken,deleteCategory);



module.exports = router;
