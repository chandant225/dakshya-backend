const express = require("express");
const router = express.Router();
const { SignIn, SignUp } = require("../controllers/adminController");

router.post("/sign_up", SignUp);
router.post("/sign_in", SignIn);

module.exports = router;
