const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log("data base is successful connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports=connectDb
