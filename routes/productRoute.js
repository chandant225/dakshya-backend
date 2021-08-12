const express = require("express");
const {
  add_Product,
  add_Categories,
  get_categories,
  get_product,
} = require("../controllers/productController");
const router = express.Router();
const { upload } = require("../helper/product_fileHelper");

router.post("/add_product", upload.array("images"), add_Product);
router.post("/add_category", add_Categories);
router.get("/categories", get_categories);
router.get("/get_products", get_product);
module.exports = router;
