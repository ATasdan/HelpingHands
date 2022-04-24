const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Bad Token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    req.userID = payload.userID
    next()
  } catch (error) {
      throw new UnauthenticatedError('Bad Token')
  }
};

module.exports = auth
