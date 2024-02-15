const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("Hello user router");
});
module.exports = router;
