/** @format */
const Product = require("../models/product");
const fs = require("fs");

// Create Product
exports.createProduct = async (req, res) => {
  const product = req.body;
  const imagename = req.file.filename;
  product.image = imagename;
  try {
    await Product.create(product);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch All Product
exports.fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch Product By Id
exports.fetchProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update A Product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
    try {
      fs.unlinkSync("./src/uploads" + req.body.oldImage);
    } catch (error) {
      console.log(error);
    }
  } else {
    newImage = req.body.oldImage;
  }

  const newProduct = req.body;
  newProduct.image = newImage;

  try {
    await Product.findByIdAndUpdate(id, newProduct);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deleted A Product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = Product.findByIdAndDelete(id);
    if (product.image !== "") {
      try {
        fs.unlinkSync("./src/uploads/" + product.image);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
