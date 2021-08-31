const express = require("express");
const {
  add_coupon,
  redeem_coupon,
  get_coupons
} = require("../controllers/couponController");
const router = express.Router();

router.post("/coupon/add", add_coupon);
router.post("/coupon/redeem", redeem_coupon);
router.get("/coupons", get_coupons);

module.exports = router;
