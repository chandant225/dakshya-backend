const express = require("express");
const {
  add_coupon,
  redeem_coupon
} = require("../controllers/couponController");
const router = express.Router();

router.post("/coupon/add", add_coupon);
router.post("/coupon/redeem", redeem_coupon);

module.exports = router;
