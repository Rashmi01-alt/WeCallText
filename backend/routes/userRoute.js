const express = require("express");
const router = express.Router();


const {registerUser, authUser } = require("../controllers/userControllers")


router.post("/registerUser",registerUser);


router.post("/authUser", authUser);









module.exports = router;
