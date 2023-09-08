const express = require("express");
const router = express.Router();
const { allMessages, sendMessage,} = require("../controllers/messageController");
const { protect } = require("../middlewares/authmiddleware");

router.post("/", protect, sendMessage);
//fetching all the message for one single chat
router.get("/:chatId", protect, allMessages);

module.exports = router;