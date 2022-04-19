const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

// Request must contain name,password,email and bloodtype+
const register = async (req, res) => {
  const User = await UserModel.create(req.body);
  const token = User.createJWT();
  const userData = {
    name: User.name,
    email: User.email,
    bloodType: User.bloodType,
    phoneNumber: User.phoneNumber,
    address: User.address,
  };
  res.status(StatusCodes.CREATED).json({ token: token, data: userData });
};

// Request must contain email and password
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const User = await UserModel.findOne({ email });
  if (!User || !(await User.comparePassword(password))) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = User.createJWT();
  const userData = {
    name: User.name,
    email: User.email,
    bloodType: User.bloodType,
    phoneNumber: User.phoneNumber,
    address: User.address,
  };
  res.status(StatusCodes.OK).json({ token: token, data: userData });
};

// Request must contain a JWT token containing userID
const deleteUser = async (req, res) => {
  const payload = validateJWT(req);
  const User = await UserModel.findByIdAndDelete(payload.userID);
  if(!User){
      throw new NotFoundError('User not found')
  }
  res.status(StatusCodes.OK).send();
};

// Request must contain a JWT token containing userID and data (a user object)
const updateUser = async (req, res) => {
  const payload = validateJWT(req);
  const User = await UserModel.findByIdAndUpdate(
    { _id: payload.userID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if(!User){
      throw new NotFoundError('User not found')
  }
  const userData = {
    name: User.name,
    email: User.email,
    bloodType: User.bloodType,
    phoneNumber: User.phoneNumber,
    address: User.address,
  };
  res.status(StatusCodes.OK).json({ data: userData });
};

// Helper function, normally JWT validation is done in authentication middleware
function validateJWT(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Bad Token");
  }

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new UnauthenticatedError("Bad Token");
  }
}

module.exports = { register, login, deleteUser, updateUser };

// After authentication, frontend is provided with a JWT containing the userID
// This userID must be sent in future requests for authentication
