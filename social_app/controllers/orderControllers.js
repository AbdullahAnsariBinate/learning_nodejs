const Orders = require("../modals/Orders");
const createOrder = async (req, res) => {
  console.log("Ehllow world", req.user);
  try {
    // const newObj = { ...req.body };
    // req.body.orderBy = req.user.username;
    const Order = new Orders({ orderBy: req.user?.username, ...req.body });
    await Order.save();
    res
      .status(200)
      .json({ message: "Your order has been placed!", statusCode: 200 });
  } catch (err) {
    console.log("🚀 ~ createOrder ~ err:", err);
    res.status(500).json({ message: err.message, statusCode: 500 });
  }
};
module.exports = { createOrder };
