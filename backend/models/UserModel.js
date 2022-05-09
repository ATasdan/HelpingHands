// User Document Model for MongoDB
// Name, Password, Email and BloodType fields are required
// Blood type must match enumerated types
// Email must match a correct form and must be unique(primary key)
// Phone number can only contain digits
// Passwords are hashed before saving
// Contains JWT token creation and password comparing methods for controllers

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field cannot be empty"],
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field cannot be empty"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email must be valid",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password field cannot be empty"],
      minlength: 6,
    },
    bloodType: {
      type: String,
      required: [true, "Blood type field cannot be empty"],
      enum: {
        values: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
        message: "Invalid blood type",
      },
    },
    phoneNumber: {
      type: String,
      match: [/\d+/, "Phone number can only contain digits"],
    },
    address: {
      type: String,
      minlength: 5,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const hashed = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashed;
    }
    next();
  } catch (error) {
    return next(err);
  }
});

// Returns a JWT token with userID and name
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Compares given password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("UserModel", UserSchema);
