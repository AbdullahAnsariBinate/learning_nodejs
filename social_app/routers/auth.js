const {
  register,
  login,
  changePassword,
} = require("../controllers/authControllers");
const validateToken = require("../middleware/validatejwttoken");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/changepassword").put(validateToken, changePassword);

module.exports = router;
