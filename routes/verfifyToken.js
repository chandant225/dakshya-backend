const express = require('express')
const router = express.Router()
const auth  = require("../middlewares/auth");

router.post('/verify_token',auth,(req,res) => {
    res.end;
})

module.exports = router;