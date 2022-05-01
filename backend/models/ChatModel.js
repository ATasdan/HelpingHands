const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    senderID: String,
    receiverID: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
