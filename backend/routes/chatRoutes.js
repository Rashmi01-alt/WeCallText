const express = require("express");
const { protect } = require("../middlewares/authmiddleware");
const { accesschat } =require("../controllers/chatController")
const router = express.Router();


router.post("/", protect, accesschat);
// router.get("/", protect, fetchchats);
// router.post("/group", protect, createGroupchat);
// router.put("/rename", protect, renameGroup);
// router.put("/groupremove", protect, removeFromLife);
// router.put("/groupadd", protect, addtoGroup);


module.exports = router;