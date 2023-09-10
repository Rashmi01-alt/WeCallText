const express = require("express");

const dotenv = require("dotenv");
const { dbconnect } = require("./config/database");
const userRoute  = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middlewares/errormiddleware");
const app = express();

app.use(express.json());
dotenv.config();


app.use("/api/user", userRoute);
app.use("/api/chats", chatRoutes);
app.use("/api/messages",messageRoutes );


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

dbconnect();

app.get("/", (req, res) => {
  res.send("app is running succesfully");
});
const server=app.listen(
   PORT,
   console.log(`Server running on PORT ${PORT}`)
 );


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http:/localhost:3000",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");


  //creating a new socket wwhere frontend will send some data and join a room
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // it will take room-id from the frontend
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room :"
      + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"))
  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))
//sending message functionality
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined")
   
   
   
    // logic such tht in group chat we dont recieve back our own messages
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id)
        return;
      socket.in(user._id).emit("message received", newMessageReceived);
      

    });
    
    
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
  });
