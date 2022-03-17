/** @format */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../controllers/product");
const {
  requireSignin,
  adminMiddleware,
} = require("../middlewares/index");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './src/uploads')
  },
  filename: function(req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname)
  },
})

let upload = multer({
  storage: storage,
}).single("image")

router.get('/', Product.fetchAllProduct)
router.get('/:id', Product.fetchProductById)
router.post('/create',requireSignin, adminMiddleware ,upload, Product.createProduct)
router.patch('/:id',upload,requireSignin, adminMiddleware, Product.updateProduct)
router.delete('/:id',requireSignin, adminMiddleware, Product.deleteProduct)

module.exports = router;
