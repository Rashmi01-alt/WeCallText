const { populate } = require("dotenv");
const Chat = require("../models/chatModel");
const User = require("../models/user");

const accesschat = (async (req, res) => {
    const userId = req.body;

    if (!userId) {
        console.log("user id not sent with params");
        return res.status(400);
    
    }
    var isChat = await Chat.find({
        isGrouptChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },// current id  of user tht is logged in
            { users: { $elemMatch: { $eq: userId } } },//user id fetched
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    //chat array is populated by the following details
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "mame pic email",
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);//no ther chat can exist with these two users
    } else {
        var Chatdata = {
            chatname: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
    }
    
    try {
        const createdChat = await Chat.create(Chatdata);

        const Fullchat = await Chat.findOne({ _id: createdChat._id }).populate("users", "password");
        res.status(200).send(Fullchat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});
// to get all the chat of which the user is part of
const fetchChats = (async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
  })


const createGroupchat = (async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({
            message: "please fill all the fields"});
    }
    // we will send the array in stringify format from frontend and parse it as json object in backend
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).send("more than 2 users are required to form a group chat")
    }
        users.push(req.user);//adding the cureent user also to the group chat
    try {
        const groupChat = await Chat.create({
            chatName: req.body.user,
            user: users,
            isGrouptChat: true,
            groupAdmin: req.user,
        });
        //fetching the chats from db and returning it to the user
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGrouptChat);
    } catch (error) {
         res.statys(400);
        throw new Error(error.message);
    }
});


const renameGroup = (async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId, { chatName }, { new: true })
    
    
    .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!updatedChat) {
        res.status(404);
        console.log("chat not found");
    }
    else {
        res.json(updatedChat);
    }
})



const addtoGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId }, },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(404);
        console.log("chat not found");

    } else {
        res.json(added);
    }
}

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId }, },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404);
        console.log("chat not found");

    } else {
        res.json(added);
    }
}

module.exports = {accesschat,fetchChats,createGroupchat,renameGroup,addtoGroup,removeFromGroup};
