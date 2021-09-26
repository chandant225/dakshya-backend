const express = require("express");
const {
  add_coupon,
  redeem_coupon,
  delete_coupon,
  get_coupons
} = require("../controllers/couponController");
const router = express.Router();

router.post("/coupon/add", add_coupon);
router.post("/coupon/redeem", redeem_coupon);
router.get("/coupons", get_coupons);
router.post("/coupons/:coupon_id", delete_coupon)

module.exports = router;
