const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
//fn allUsers returns search results , but before that the middleware protect is activated to authorise current user
//and then search process is activated

// function registerUser is in controllers/userControllers for registering new users

router.route("/login").post(authUser);

router.route;

module.exports = router;
