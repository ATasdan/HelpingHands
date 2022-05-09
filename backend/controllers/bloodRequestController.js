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
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    bloodType: req.body.bloodType,
    hospital: req.body.hospital,
    expDate: req.body.expDate,
    units: req.body.units,
  };
  const BloodRequest = await BloodRequestModel.create(requestData);
  const responseData = {
    receiver: {
      name: Receiver.name,
      email: Receiver.email,
      phoneNumber: Receiver.phoneNumber,
      receiverID: req.userID,
    },
    latitude: requestData.latitude,
    longitude: requestData.latitude,
    hospital: requestData.hospital,
    bloodType: requestData.bloodType,
    requestID: BloodRequest._id,
    expDate: requestData.expDate,
    units: requestData.units,
  };
  res.status(StatusCodes.OK).json({ data: responseData });
};

// For now, gets all requests
const getNearbyRequests = async (req, res) => {
  const AllRequests = await BloodRequestModel.find();
  if (!AllRequests) {
    throw new BadRequestError("No nearby blood requests found");
  }
  const Pledges = await RequestPledgeModel.find({ donorID: req.userID });
  const responseData = [];
  for (const element of AllRequests) {
    if (
      element.receiverID === req.userID ||
      (await RequestPledgeModel.findOne({
        donorID: req.userID,
        requestID: element._id,
      }))
    ) {
      continue;
    }
    const Receiver = await UserModel.findById(element.receiverID);
    const receiverData = {
      name: Receiver.name,
      email: Receiver.email,
      bloodType: Receiver.bloodType,
      phoneNumber: Receiver.phoneNumber,
      receiverID: Receiver._id,
    };
    responseData.push({
      receiver: receiverData,
      location: element.location,
      hospital: element.hospital,
      bloodType: element.bloodType,
      requestID: element._id,
      creationDate: element.createdAt,
      expirationDate: element.expDate,
      units: element.units,
      distance: "20km", // TODO: FIX THIS
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
  if (Donor._id === Receiver._id) {
    throw new BadRequestError("Cannot pledge to self!");
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
  const pledgeData = [];
  for (const element of Pledges) {
    const Request = await BloodRequestModel.findById(element.requestID);
    const Receiver = await UserModel.findById(Request.receiverID);
    const receiverData = {
      name: Receiver.name,
      email: Receiver.email,
      phoneNumber: Receiver.phoneNumber,
      bloodType: Receiver.bloodType,
      receiverID: Receiver._id,
    };
    const responseData = {
      receiver: receiverData,
      location: Request.location,
      hospital: Request.hospital,
      bloodType: Request.bloodType,
      requestID: Request._id,
      creationDate: Request.createdAt,
      expirationDate: Request.expDate,
      units: Request.units,
      distance: "20km", // TODO: FIX THIS
    };
    pledgeData.push(responseData);
  }

  res.status(StatusCodes.OK).json({ data: pledgeData });
};

const deletePledge = async (req, res) => {
  const Pledge = await RequestPledgeModel.findOneAndDelete({
    donorID: req.userID,
    requestID: req.body.requestID,
  });
  if (!Pledge) {
    throw new BadRequestError("Pledge not found");
  }
  res.status(StatusCodes.OK).json({ data: Pledge });
};

const getYourRequests = async (req, res) => {
  const Requests = await BloodRequestModel.find({ receiverID: req.userID });
  const requestData = [];
  const pledgeData = [];
  for (Request of Requests) {
    const Pledges = await RequestPledgeModel.find({ requestID: Request._id });
    if (!Pledges) {
      continue;
    }
    requestData.push({
      hospital: Request.hospital,
      bloodType: Request.bloodType,
      creationDate: Request.createdAt,
      units: Request.units,
      expirationDate: Request.expDate,
      requestID: Request._id,
      units: Request.units,
    });
    for (Pledge of Pledges) {
      const Donor = await UserModel.findById(Pledge.donorID);
      pledgeData.push({
        requestID: Pledge.requestID,
        donorData: {
          name: Donor.name,
          email: Donor.email,
          phoneNumber: Donor.phoneNumber,
          donorID: Donor._id,
        },
      });
    }
  }

  res
    .status(StatusCodes.OK)
    .json({ data: { requests: requestData, pledges: pledgeData } });
};

const cancelRequest = async (req, res) => {
  const Pledges = await RequestPledgeModel.find({
    requestID: req.body.requestID,
  });
  for (const Pledge in Pledges) {
    await RequestPledgeModel.deleteOne({ _id: Pledge._id });
  }

  const Request = await BloodRequestModel.findByIdAndDelete(req.body.requestID);
};

module.exports = {
  createRequest,
  pledgeToRequest,
  getNearbyRequests,
  getPledges,
  deletePledge,
  getYourRequests,
  cancelRequest,
};
