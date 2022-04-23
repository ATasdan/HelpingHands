const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

/**
 * @api {post} /auth/register  Register User
 * @apiName Register User
 * @apiGroup User 
 * 
 * @apiParam {String} name length > 3 REQUIRED
 * @apiParam {String} password length > 6 REQUIRED
 * @apiParam {String} email must be unique REQUIRED
 * @apiParam {String} bloodType must be a correct type REQUIRED
 * @apiParam {String} phoneNumber cannot contain characters 
 * @apiParam {String} address length > 5
 * 
 * @apiSuccess (201 Created) {string} token JWT Token (Expiry Date:30d)
 * @apiSuccess (201 Created) {Object} data {name,email,bloodType,phoneNumber,address}
 * 
 * @apiSuccessExample Success-Response:
 * 
 *  HTTP/1.1 201 CREATED
 *  {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*eyJ1c2VySUQiOiI2MjYzZmYwMDc2M2M0ODgxNjEyMTI5ZDkiLCJuYW1lIjoiTWV0ZWhhbiIsImlhdCI6MTY1MDcyMDUxMywiZ*XhwIjoxNjUzMzEyNTEzfQ.kIjP4hp651HRGbkodzWYm82q0l6KtCv-7Bks4wStbA8",
 *     "data": {
 *       "name": "Metehan",
 *       "email": "metehan2@gmail.com",
 *       "bloodType": "AB+",
 *       "phoneNumber": "032142314",
 *       "address": "addresstest"
 *      }
 *  }

* @apiError (400 Bad Request) UserAlreadyRegistered email already exists.
* @apiError (400 Bad Request) NameTooShort name.length < 3
* @apiError (400 Bad Request) InvalidEmailFormat email is not in a correct format
* @apiError (400 Bad Request) PasswordTooShort password.length < 6
* @apiError (400 Bad Request) InvalidBloodType bloodType != "0+,0-,A+,A-,B+,B-,AB+,AB-"
* @apiError (400 Bad Request) AddressTooShort address < 5
* @apiError (400 Bad Request) CharactersInPhoneNumber phoneNumber contains non-number characters

  @apiErrorExample Error-Response:
  HTTP/1.1 400 Bad Request
  {
    {
    "msg": "Duplicate value entered for email field, please choose another value"
    }
  }
 */

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

/**
 * @api {post} /auth/login  Login User
 * @apiName Login User
 * @apiGroup User 
 * 
 * 
 * @apiParam {String} email REQUIRED
 * @apiParam {String} password REQUIRED
 * 
 * @apiSuccess (200 OK) {String} token JWT Token (Expiry Date:30d)
 * @apiSuccess (200 OK) {Object} data{name,email,bloodType,phoneNumber,address}
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*eyJ1c2VySUQiOiI2MjY0MzI4MzdkNDQ0YzIzNGQ2MmI4YWEiLCJuYW1lIjoiSGFzIiwiaWF0IjoxNjUwNzM4MjI3LCJleHAiO*jE2NTMzMzAyMjd9.pAsZamwVUfIbq0qO_Bg05Hfu_Vihv5c81WtvH1qO_vk",
 *  "data": {
 *     "name": "Has",
 *     "email": "Has@gmail.com",
 *     "bloodType": "B-",
 *     "phoneNumber": "0318477475",
 *     "address": "Hdhdh"
 *   }
 * }
 * 
 * @apiError (400 Bad Request) NoEmailOrPassword provide both fields
 * 
 * @apiErrorExample 400-Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
    "msg": "Please provide email and password"
 * }

    @apiError (401 Unauthorized) IncorrectCredentials user does not exist or invalid password
    @apiErrorExample 401-Error-Response:
    HTTP/1.1 401 Unauthorized
    {
    "msg": "Invalid credentials"
    }
 */
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


/**
 * @api {delete} /auth/modify  Delete User
 * @apiName Delete User
 * @apiGroup User 
 * 
 * @apiHeader {String} Authorization Bearer token must be sent
 * 
 * @apiSuccess (200 OK) - -
 * 
 * @apiError (400 Bad Request) UserNotFound realistically should not happen
 * @apiError (401 Unauthorized) InvalidToken Invalid or no token sent
 * 
 * */
const deleteUser = async (req, res) => {
  const payload = validateJWT(req);
  const User = await UserModel.findByIdAndDelete(payload.userID);
  if (!User) {
    throw new NotFoundError("User not found");
  }
  res.status(StatusCodes.OK).send();
};

/**
 *  @api {patch} /auth/modify  Update User
 * @apiName Update User
 * @apiGroup User 
 * 
 * @apiHeader {String} Authorization Bearer token must be sent
 * 
 * @apiParam {String} email
 * @apiParam {String} name
 * @apiParam {String} password
 * @apiParam {String} bloodType
 * @apiParam {String} phoneNumber
 * @apiParam {String} address
 * 
 * @apiSuccess (200 OK) {Object} data{email,name,password,bloodType,phoneNumber,address}
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK {
 *  "data": {
 *       "name": "Hassam",
 *       "email": "anil2@gmail.com",
 *       "bloodType": "AB+",
 *       "phoneNumber": "032142314",
 *       "address": "addresstest"
 *   }
 * }
 * 
 * @apiError (400 Bad Request) UserNotFound the user was not found
 * @apiError (400 Bad Request) UserAlreadyRegistered email already exists.
 * @apiError (400 Bad Request) NameTooShort name.length < 3
 * @apiError (400 Bad Request) InvalidEmailFormat email is not in a correct format
 * @apiError (400 Bad Request) PasswordTooShort password.length < 6
 * @apiError (400 Bad Request) InvalidBloodType bloodType != "0+,0-,A+,A-,B+,B-,AB+,AB-"
 * @apiError (400 Bad Request) AddressTooShort address < 5
 * @apiError (400 Bad Request) CharactersInPhoneNumber phoneNumber contains non-number characters
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request{
 *  "msg": "Email must be valid"
 * }
 * 
 * @apiError (401 Unauthorized) InvalidToken Invalid or no token sent
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized{
 *  "msg": "Bad Token"
 * }
 * 
 */
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
  if (!User) {
    throw new BadRequestError("User not found");
  }
  const userData = {
    name: User.name,
    password: User.password,
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
