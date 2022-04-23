// basic imports
require("dotenv").config();
const axios = require('axios');
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// router imports
const authRouter = require('./routes/authRouter')

// middleware imports
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


// middleware
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 60 }));


// routes
app.use(express.static('./public'))
app.use('/api/docs',express.static('./apidoc'))
app.use('/api/auth',authRouter)

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port variable (dynamic OR static for localhost)
const PORT = process.env.PORT || 5000

// spin up the server
const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT,() => console.log(`Server is listening on port ${PORT}`))
        func()
    } catch (error) {
        console.log(error);
    }
}

start()


