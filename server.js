const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connects to DB
connectDB();

app.get("/", (req, res) => {
  res.send("Api is running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
