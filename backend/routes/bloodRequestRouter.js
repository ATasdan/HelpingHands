const express = require("express");
const router = express.Router();

const { createRequest } = require("../controllers/bloodRequestController");

router.route('/create').post(createRequest)

module.exports = router;