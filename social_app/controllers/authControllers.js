const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      emailId: req.body.emailId,
      mobile: req.body.mobile,
      gender: req.body.gender,
      password: hashedPassword,
      role: req.body.role,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log("errsssor", error);
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });

    if (!user) {
      res
        .status(500)
        .json({ statusCode: 404, message: "Invalid email or password!" });
      return;
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user?.password
    );

    if (!checkPassword) {
      res
        .status(500)
        .json({ statusCode: 404, message: "Invalid email or password!" });
      return;
    }
    user.token = "";
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "9000000000h",
    });
    user.token = accessToken;
    await user.save();
    const updatedUser = await User.findOne({ emailId: req.body.emailId });
    res
      .status(200)
      .json({ updatedUser, statusCode: 200, message: "Login successfully!" });
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatePassword = await User.findOneAndUpdate(
      { emailId },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res
      .status(200)
      .json({ statusCode: 200, message: "Password Update Successfully!" });
  } catch (err) {
    console.log("Change Password Error:", err);
  }
};

module.exports = { register, login, changePassword };
