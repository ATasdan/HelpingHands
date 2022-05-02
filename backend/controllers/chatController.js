const UserModel = require("../models/UserModel");
const ChatModel = require("../models/ChatModel");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const getAllMessages = async (req, res) => {
  const SentMessages = await ChatModel.find({
    senderID: req.userID,
    receiverID: req.body.targetID,
  });
  const ReceivedMessages = await ChatModel.find({
    senderID: req.body.targetID,
    receiverID: req.userID,
  });

  const responseData = {
    sentMessages: SentMessages,
    receivedMessages: ReceivedMessages,
    yourID: req.userID
  };
  res.status(StatusCodes.OK).json({ data: responseData });
};

const sendMessage = async (req, res) => {
  const Message = await ChatModel.create({
    senderID: req.userID,
    receiverID: req.body.targetID,
    message: req.body.message,
  });
  res.status(StatusCodes.CREATED).json({data: Message})
};

module.exports = {getAllMessages,sendMessage}