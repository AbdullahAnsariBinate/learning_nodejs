//Middlewares and libraries imports.
const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
//Routes Imports
const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const categoryRouter = require("./routers/category");
const productRouter = require("./routers/product");
const ordersRouter = require("./routers/orders");

dotenv.config();

//Database Connection
mongoose
  .connect(process.env.MOONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(`Database not connected! Here is Error: ${err}`);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Routes
app.use("/socialapp/api/users", userRouter);
app.use("/socialapp/api/auth", authRouter);
app.use("/socialapp/api/category", categoryRouter);
app.use("/socialapp/api/product", productRouter);
app.use("/socialapp/api/orders", ordersRouter);

// app.get("/user", (req, res) => {
//   res.send("Hello World!");
// });

//Listen the app port
app.listen(3000, () => {
  console.log(`App is running on Port ${3000}`);
});
