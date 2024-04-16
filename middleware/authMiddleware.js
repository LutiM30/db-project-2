// Mitul 8927992
// Karishma 8911439
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const authMiddleware = async (req, res, next) => {
  try {
    var decoded = jwt.verify(req.session.token, "musicstore");
    const auth = await Auth.findById(decoded._id);
    if (!auth) {
      throw new Error("User not found");
    }

    req.user = auth;
    next();
  } catch (err) {
    res.redirect("/login");
  }
};

module.exports = authMiddleware;
