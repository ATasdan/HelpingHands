// basic imports
require("dotenv").config();
require("express-async-errors");
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// router imports
const authRouter = require("./routes/authRouter");
const bloodRequestRouter = require("./routes/bloodRequestRouter");
const chatRouter = require("./routes/chatRouter");

// middleware imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 100 }));

// routes
app.use(express.static("./public"));
app.use("/api/auth", authRouter);
app.use("/api/bloodRequest", authenticationMiddleware, bloodRequestRouter);
app.use("/api/chat", authenticationMiddleware, chatRouter);

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port variable (dynamic OR static for localhost)
const PORT = process.env.PORT || 4000;

// spin up the server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
