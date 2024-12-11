const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const cors = require('cors')

app.get("/", (req, res) => {
  res.send("Hello1");
});

app.use(express.json());
app.use(cors())

app.post("/login", (req, res) => {
  // Authenticate

  // Token creation
  const username = req.body.username;
  const user = { name: username };
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(user, secretKey);
  res.json({ accesstoken: token });
});

app.use("/products", productRouter);
app.use("/users", userRouter);

const mongoUrl = process.env.MONGODB_URL;
async function main() {
  await mongoose.connect(mongoUrl);
}

main()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const ProductData = require("./models/product");

app.listen(port, () => {
  console.log("New server started");
});
