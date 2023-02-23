const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
require ("dotenv").config();

app.use(cors());
app.use(morgan("dev"));

//connection to database
connectDB();

//define routes
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productsApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/profile", require("./routes/profileApi"));
app.use("/api/cart", require("./routes/cartApi"));


app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
