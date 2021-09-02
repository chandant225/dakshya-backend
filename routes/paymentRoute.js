const express = require("express");
const {
  add_payment,
  list_payment
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment/add", add_payment);
router.get("/payment/list", list_payment);

module.exports = router;
