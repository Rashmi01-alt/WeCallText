const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { dbconnect } = require("./config/database");
const { userRoute } = require("./routes/userRoute");
const {chatRoutes} = require("./routes/chatRoutes")

const { notFound, errorHandler } = require("./middlewares/errormiddleware");

app.use(express.json());
dotenv.config();


app.use("/api/user", userRoute);
app.use("/api/chat",chatRoutes );


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

dbconnect();

app.get("/", (req, res) => {
  res.send("app is running succesfully");
});
app.listen(
   PORT,
   console.log(`Server running on PORT ${PORT}`)
 );

