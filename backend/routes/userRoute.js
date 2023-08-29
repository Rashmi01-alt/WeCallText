const express = require("express");
const router = express.Router();


const {registerUser, authUser,allusers } = require("../controllers/userControllers")


router.post("/registerUser",registerUser);


router.post("/authUser", authUser);

router.get("/", allusers);







module.exports = router;
