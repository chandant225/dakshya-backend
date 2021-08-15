const express = require("express");
const router = express.Router();
const { add_review, get_review } = require("../controllers/reviewController");

router.post("/reviews/add", add_review);
router.get("/reviews/:product_id", get_review);

module.exports = router;
