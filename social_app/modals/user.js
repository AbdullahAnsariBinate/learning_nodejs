const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      max: 50,
    },
    emailId: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    mobile: {
      type: String,
      max: 11,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      max: 50,
      require: true,
    },
    gender: {
      type: String,
      max: 50,
      require: true,
    },
    dob: {
      type: String,
      max: 50,
    },
    address: {
      type: String,
      max: 50,
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    token: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
