const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

//connects to DB
connectDB();

//use cors
app.use(cors())

//Init the middleware
app.use(express.json({extended: false}));

app.get("/", (req, res) => {
  res.send("Api is running");
});

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
