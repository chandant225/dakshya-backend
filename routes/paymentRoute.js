const express = require("express");
const {
  add_payment,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment/add", add_payment);

module.exports = router;
