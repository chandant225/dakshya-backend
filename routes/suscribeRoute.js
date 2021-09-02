const express = require("express");
const router = express.Router();
const { add_suscriber, getSubscriber, deleteSubscriber } = require("../controllers/suscribeController");

router.post("/suscriber/add", add_suscriber);
router.get("/suscribers", getSubscriber);
router.post("/subscriber/:Sub_id", deleteSubscriber)

module.exports = router;
