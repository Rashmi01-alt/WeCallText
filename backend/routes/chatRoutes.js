const express = require("express");
const { protect } = require("../middlewares/authmiddleware");
const { accesschat,fetchChats,createGroupchat,renameGroup,addtoGroup,removeFromGroup} =require("../controllers/chatController")
const router = express.Router();


router.post("/", protect, accesschat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupchat);
router.put("/rename", protect, renameGroup);
router.put("/groupremove", protect, removeFromGroup);
router.put("/groupadd", protect, addtoGroup);


module.exports = router;