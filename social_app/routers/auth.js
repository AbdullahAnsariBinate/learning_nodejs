const User = require("../modals/user");

const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.send("Hello auth router");
// });

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    emailId: req.body.emailId,
    mobile: req.body.mobile,
    gender: req.body.gender,
    password: req.body.password,
  });
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log("errsssor", error);
    res.status(500).json(error);
  }
});

module.exports = router;
