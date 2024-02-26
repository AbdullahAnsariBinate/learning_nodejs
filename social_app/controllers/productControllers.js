const Product = require("../modals/Product");
const Category = require("../modals/Category");
const parser = require("../middleware/cloudinaryStorage");

const createProduct = async (req, res) => {
  try {
    parser.array("image", 10)(req, res, async (err) => {
      if (err) {
        res
          .status(400)
          .json({ statusCode: false, message: "Images uploading failed!" });
        return;
      }

      let allImages = [];
      let imgs = req.files;
      imgs.forEach((item, index) => {
        allImages.push(item?.path);
      });
      console.log("allImages", allImages);
      const { title, description, price, categoryId } = req.body;
      const newProducts = new Product({
        title,
        description,
        categoryId,
        price,
        image: allImages,
      });

      await newProducts.save();

      res
        .status(200)
        .json({ message: "Product added successfully!", statusCode: 200 });
    });
  } catch (err) {
    console.log("🚀 ~ createProduct ~ err:", err);
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    let obj = {};
    if (id) {
      obj._id = id;
    }

    let allProducts = await Product.find(obj);
    res.status(200).json({
      message: "Get all products successfully!",
      data: allProducts,
      statusCode: 200,
    });
  } catch (err) {
    console.log("🚀 ~ getProduct ~ err:", err);
  }
};

// const updateProduct = async (req, res, ) => {
//   console.log("🚀 ~ updateProduct ~ req:", req)
//   const { title, description, price, image, categoryId } = req.body;
//   const { id } = req.query;
//   parser.array("image", 10)(req, res, async (err) => {
//     if (err) {
//       res
//         .status(400)
//         .json({ statusCode: false, message: "Images uploading failed!" });
//       return;
//     }

//     let allImages = [];
//     let imgs = req.files;
//     imgs.forEach((item, index) => {
//       allImages.push(item?.path);
//     });
//     const updatedTitle = title;
//     const updatedDescription = description;
//     const updatedPrice = price;
//     const updateImages = allImages;


//     console.log(updatedTitle, updatedDescription, "jhhjdhdhdhdhhd");

//     await Product.findOneAndUpdate(
//       { _id: id },
//       {
//         $set: {
//           title: updatedTitle,
//           description: updatedDescription,
//           categoryId: categoryId,
//           price: updatedPrice,
//           image: allImages,
//         },
//       }
//     );

//     res
//       .status(200)
//       .json({ message: "Product updated successfully!", statusCode: 200 });
//   });
// };
const updateProduct = async (req, res) => {
  console.log("🚀 ~ updateProduct ~ req:", req);
  const { title, description, price, categoryId } = req.body;
  const { id } = req.query;

  parser.array("image", 10)(req, res, async (err) => {
    if (err) {
      res.status(400).json({ statusCode: false, message: "Images uploading failed!" });
      return;
    }

    let allImages = [];
    let imgs = req.files;
    imgs.forEach((item, index) => {
      allImages.push(item?.path);
    });

    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            description: description,
            categoryId: categoryId,
            price: price,
            image: allImages,
          },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully!", statusCode: 200 });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = { createProduct, getProduct, updateProduct };
