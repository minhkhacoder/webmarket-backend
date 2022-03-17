/** @format */

const express = require("express");
const category = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../middlewares/index");
const router = express.Router();

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  category.addCategory
);
router.get("/categogy/getcategory", category.getCategories);
router.patch("/category/update", requireSignin, category.updateCategories);
router.delete("/category/delete", requireSignin, category.deleteCategories);

module.exports = router;
