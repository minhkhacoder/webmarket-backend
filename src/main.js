/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const port = process.env.PORT || 3000;

// Connect database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ROOT}:${process.env.DB_PASS}@cluster0.4r5pk.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log("Database connected successfully!"))
  .catch((error) => console.log(error));

// Routers
const auth = require("./routers/admin/auth");
const user = require("./routers/user");
const category = require("./routers/category");
const product = require("./routers/product");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));
app.use("/api", auth);
app.use("/api", user);
app.use("/api", category);
app.use("/api", product);

app.listen(port, () => {
  console.log(`Welcome http://localhost:${port}`);
});
