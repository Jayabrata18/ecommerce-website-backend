require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_PROD,
  jwtSecret: process.env.MONGODB_JWT_SECRET,
};
