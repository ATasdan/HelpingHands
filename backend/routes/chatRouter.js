const express = require("express");
const router = express.Router();

const { getAllMessages,sendMessage } = require("../controllers/chatController");

router.route('/getAllMessages').post(getAllMessages)
router.route('/sendMessage').post(sendMessage)
module.exports = router;