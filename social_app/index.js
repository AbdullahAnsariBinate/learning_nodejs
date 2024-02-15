const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");

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

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Routes
app.use("/socialapp/api/users", userRouter);
app.use("/socialapp/api/auth", authRouter);

// app.get("/user", (req, res) => {
//   res.send("Hello World!");
// });

//Listen the app port
app.listen(8200, () => {
  console.log(`App is running on Port ${8200}`);
});