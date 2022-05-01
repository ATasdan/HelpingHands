const express = require("express");
const router = express.Router();

const { getAllMessages,sendMessage } = require("../controllers/chatController");

router.route('/').get(getAllMessages).post(sendMessage)
module.exports = router;