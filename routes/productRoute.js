const express = require("express");
const {
  add_Product,
  add_Categories,
  get_categories,
  get_Product,
  get_single_product,
  get_category_desc,
  get_related_products,
  delete_product
} = require("../controllers/productController");
const router = express.Router();
const { upload } = require("../helper/product_fileHelper");

router.post("/add_product", upload.array("images"), add_Product);
router.post("/add_category", add_Categories);
router.get("/categories", get_categories);
router.get("/get_products", get_Product);
router.get("/get_single_product/:title", get_single_product);
router.get("/get_category_desc/:category_id", get_category_desc);
router.get("/products/related/:category_id", get_related_products);
router.get("/product/delete/:product_id", delete_product);


module.exports = router;
