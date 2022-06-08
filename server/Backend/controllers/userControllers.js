//function for registering new users
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//use asynchandler for handling exceptions
const registerUser = asyncHandler(async (req, res) => {
  console.log("Request reached");
  const { name, email, password, pic } = req.body;

  //check if any of the given fields are undefined
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  //check if email exists or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //if not then create a new user with the given credentials
  const user = await User.create({
    name,
    email,
    password,
  });

  //user added successfully
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //generateToken fun is inside config folder
    });
  } else {
    res.status(400);
    throw new Error("Failed to signin");
  }
});

//
const authUser = asyncHandler(async (req, res) => {
  // console.log("authUser activated");
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Sheri aayi",
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.send("User not found");
  }
});

// Some data is sent to server from frontend using queries in url ex: /api/user?search=ajeeth
// access the queries in url using res.query.name_of_query
//this function is for searching all users in db for given email or name and returning list of users after search
const allUsers = asyncHandler(async (req, res) => {
  console.log("Yeah the request reached");
  const keyword = req.query.search
    ? {
        //if query named search is present, then...  search whether name or email is present in databse collection.
        $or: [
          // or operator in mongodb
          {
            name: { $regex: req.query.search, $options: "i" }, //"i" means search is non-case sensitive
          },
          {
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {
        //do nothing
      };

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); //have to check whether the user is logged in or not for this(check for jwt token)
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
