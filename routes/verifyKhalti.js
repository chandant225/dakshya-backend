const express = require("express");
const router = express.Router();
const { verifyKhalti } = require("../controllers/paymentVerify");

router.post("/verify_khalti", verifyKhalti);

module.exports = router;
