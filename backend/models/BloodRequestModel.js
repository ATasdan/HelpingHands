const mongoose = require("mongoose");

const BloodRequestSchema = new mongoose.Schema(
  {
    receiverID: {
      type: String,
      required: [
        true,
        "Check your token, this user does not exist on the database",
      ],
    },
    latitude: {
      type: String,
      required: [true, "Invalid location data provided"],
    },
    longtitude: {
      type: String,
      required: [true, "Invalid location data provided"],
    },
    fulfilled: {
      type: Boolean,
      default: false,
    },
    bloodType: String,
    hospital: String,
    units: Number,
    expDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", BloodRequestSchema);
