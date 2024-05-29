const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to mongodb...");
  } catch (err) {
    console.error(err);
    //EXITS THE CODE or the process
    process.exit(1);
  }
};

module.exports = connectDB;
