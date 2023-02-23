const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//connection to database
connectDB();

//define routes
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productsApi"));
app.use("/api/auth", require("./routes/authApi"));

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
