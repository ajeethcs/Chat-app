//    /api/chat

const express = require("express");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat); // This route is for accessing the chat section(only if the user is logged in(using protect middleware))
router.route("/").get(protect, fetchChat); //fetch all chat of the user from database
router.route("/group").post(protect, createGroupChat); //post request for creating group chat
router.route("/rename").put(protect, renameGroupChat); //post request for creating group chat
router.route("/remove").put(protect, removeFromGroup); //post request for creating group chat
router.route("/add").put(protect, addToGroup); //post request for creating group chat

module.exports = router;
