const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //   console.log("re.header.auth:", req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];

      //decode token id
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DecodedToken:", decodedToken);

      req.user = await User.findById(decodedToken.id).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
