const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const path = require("path");
const {fileURLToPath} = require("url");

const __filename = fileURLToPath(require.main.filename);
const __dirname = path.dirname(__filename);

const app = express();

//connects to DB
connectDB();

//use cors
app.use(cors());

//Init the middleware
app.use(express.json({extended: false}));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

//client
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
