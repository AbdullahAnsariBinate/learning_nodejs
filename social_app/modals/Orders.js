const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
let date = new Date().toLocaleDateString();
const OrdersSchema = new mongoose.Schema(
  {
    orderBy: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      default: date,
    },
    orderDeliveryDate: {
      type: String,
      required: true,
    },
    orderItems: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    deliveryCharges: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrdersSchema);
