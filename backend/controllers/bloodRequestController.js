const UserModel = require("../models/UserModel");
const BloodRequestModel = require("../models/BloodRequestModel");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const createRequest = async (req, res) => {
  const Receiver = await UserModel.findById(req.userID);
  if (!Receiver) {
    throw new BadRequestError("User not found, bad token");
  }

  const requestData = {
    donorID: "",
    receiverID: req.userID,
    location: req.body.latitude.concat(",").concat(req.body.longtitude),
  };
  const BloodRequest = await BloodRequestModel.create(requestData);
  const responseData = {
    donor: "",
    receiver: {
      name: Receiver.name,
      email: Receiver.email,
      phoneNumber: Receiver.phoneNumber,
    },
    location: requestData.location,
  };
  console.log(responseData);
  res.status(StatusCodes.OK).json({ data: responseData });
};

module.exports = { createRequest };
