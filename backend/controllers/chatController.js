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
    //chat array is populated by the folliwing details
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

  

module.exports = {accesschat};
