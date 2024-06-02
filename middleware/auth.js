const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from the req header
  const token = req.header("x-auth-token");

  //check if token not present
  if (!token) {
    return res.status(401).json({msg: "No token found, authorization denied"});
  }

  //verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg: "Token not valid"});
  }
};
