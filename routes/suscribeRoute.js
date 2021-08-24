const express = require("express");
const router = express.Router();
const { add_suscriber } = require("../controllers/suscribeController");

router.post("/suscriber/add", add_suscriber);

module.exports = router;
