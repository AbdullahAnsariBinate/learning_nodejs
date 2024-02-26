const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqcppc6et",
  api_key: "222887894591324",
  api_secret: "vhGlJPcESZr5az53_OyQu0YTU4s",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tesingFolder",
    allowed_formats: ["jpeg", "jpg", "png"],
  },
});
const parser = multer({
  storage: storage,
});

module.exports = parser;
