const mongoose = require("mongoose");
const config = require("./keys");
const db = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log("connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
