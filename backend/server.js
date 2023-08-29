const express = require("express");
const app = express();
const dotenv = require("dotenv");
const data = require("./data/data");
const { dbconnect } = require("./config/database");
const register_user = require("./routes/userRoute");
const authUser = require("./routes/userRoute");

const { notFound, errorHandler } = require("./middlewares/errormiddleware");

app.use(express.json());
dotenv.config();


app.use("/api/v1/", register_user);
app.use("/api/v1/", authUser);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

dbconnect();

app.get("/", (req, res) => {
  res.send("app is running succesfully");
});
app.listen(
   PORT,
   console.log(`Server running on PORT ${PORT}`)
 );

