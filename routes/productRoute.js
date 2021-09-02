const express = require("express");
const {
  add_Product,
  add_Categories,
  get_categories,
  get_Product,
  get_single_product,
  get_category_desc,
  get_related_products,
  edit_product,
  post_edit_product,
  delete_product,
  search_product
} = require("../controllers/productController");
const router = express.Router();
const { upload } = require("../helper/product_fileHelper");
const { authenticate } = require  ("../configs/verifytoken")

router.post("/add_product",authenticate, upload.array("images"), add_Product);
router.post("/add_category",authenticate, add_Categories);
router.get("/categories", get_categories);
router.get("/get_products", get_Product);
router.get("/get_single_product/:title", get_single_product);
router.get("/get_category_desc/:category_id", get_category_desc);
router.get("/products/related/:category_id", get_related_products);
router.get("/product/delete/:product_id",authenticate, delete_product);
router.get("/product/edit/:product_id",authenticate, edit_product);
router.post("/product/update/:product_id",authenticate, post_edit_product);
router.get("/product/search/:keywords", search_product);

module.exports = router;
