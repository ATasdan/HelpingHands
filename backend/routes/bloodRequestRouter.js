const express = require("express");
const router = express.Router();

const { createRequest,getNearbyRequests,pledgeToRequest,getPledges } = require("../controllers/bloodRequestController");

router.route('/create').post(createRequest)
router.route('/nearbyRequests').get(getNearbyRequests)
router.route('/pledge').post(pledgeToRequest).get(getPledges)
module.exports = router;