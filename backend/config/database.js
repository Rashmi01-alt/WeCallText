const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnect = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
  mongoose.connection
    .once("open", function () {
      console.log("Conection has been made!");
    })
    .on("error", function (error) {
      console.log("Error is: ", error);
    });
};
