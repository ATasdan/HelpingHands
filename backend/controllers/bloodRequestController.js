const UserModel = require("../models/UserModel");
const BloodRequestModel = require("../models/BloodRequestModel");
const RequestPledgeModel = require("../models/RequestPledgeModel");
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
    bloodType: Receiver.bloodType,
    hospital: req.body.hospital,
  };
  const BloodRequest = await BloodRequestModel.create(requestData);
  const responseData = {
    receiver: {
      name: Receiver.name,
      email: Receiver.email,
      phoneNumber: Receiver.phoneNumber,
      receiverID: req.userID,
    },
    location: requestData.location,
    hospital: requestData.hospital,
    bloodType: requestData.bloodType,
    requestID: BloodRequest._id,
  };
  res.status(StatusCodes.OK).json({ data: responseData });
};

// For now, gets all requests
const getNearbyRequests = async (req, res) => {
  const AllRequests = await BloodRequestModel.find();
  if (!AllRequests) {
    throw new BadRequestError("No nearby blood requests found");
  }
  const responseData = [];
  for(const element of AllRequests){
    if(element.receiverID === req.userID){
      continue
    }
    const Receiver = await UserModel.findById(element.receiverID)
    const receiverData = {
      name: Receiver.name,
      email: Receiver.email,
      bloodType: Receiver.bloodType,
      phoneNumber: Receiver.phoneNumber,
    };
    responseData.push({
      receiver: receiverData,
      location: element.location,
      hospital: element.hospital,
      bloodType: element.bloodType,
      requestID: element._id,
      creationDate: element.createdAt,
      distance: '20km' // TODO: FIX THIS
    });
  }
  res.status(StatusCodes.OK).json({ data: responseData });
};

const pledgeToRequest = async (req, res) => {
  const Request = await BloodRequestModel.findById(req.body.requestID);
  if (!Request) {
    throw new BadRequestError("Blood request not found");
  }
  const Receiver = await UserModel.findById(Request.receiverID);
  const Donor = await UserModel.findById(req.userID);
  if (!Donor) {
    throw new BadRequestError("Could not find donor");
  }
  if (!Receiver) {
    throw new BadRequestError("Could not find receiver");
  }
  if(Donor._id === Receiver._id){
    throw new BadRequestError('Cannot pledge to self!');
  }
  const Pledge = await RequestPledgeModel.create({
    donorID: Donor._id,
    requestID: Request._id,
  });
  const donorData = {
    name: Donor.name,
    email: Donor.email,
    bloodType: Donor.bloodType,
    phoneNumber: Donor.phoneNumber,
  };
  const receiverData = {
    name: Receiver.name,
    email: Receiver.email,
    bloodType: Receiver.bloodType,
    phoneNumber: Receiver.phoneNumber,
  };
  res
    .status(StatusCodes.OK)
    .json({ data: { donor: donorData, receiver: receiverData } });
};

const getPledges = async (req, res) => {
  const Pledges = await RequestPledgeModel.find({ donorID: req.userID });
  if (Pledges === []) {
    throw new BadRequestError("No pledges found");
  }
  const pledgeData = []
  for(const element of Pledges){
    const Request = await BloodRequestModel.findById(element.requestID)
    const Receiver = await UserModel.findById(Request.receiverID)
    const receiverData = {
      name:Receiver.name,
      email:Receiver.email,
      phoneNumber:Receiver.phoneNumber,
      bloodType:Receiver.bloodType
    }
    const responseData = {
      receiver: receiverData,
      location: Request.location,
      hospital: Request.hospital,
      bloodType: Request.bloodType,
      requestID: Request._id,
    }
    pledgeData.push(responseData)
  }
  
  res.status(StatusCodes.OK).json({ data: pledgeData });
};

module.exports = {
  createRequest,
  pledgeToRequest,
  getNearbyRequests,
  getPledges,
};
