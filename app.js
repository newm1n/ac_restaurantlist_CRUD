const express = require("express");
const mongoose = require("mongoose");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

// routes setting
app.get("/", (req, res) => {
  res.send("hello world");
});

// start and listen on the Express server
app.listen(port, () => {
  console.log("App is running on http://localhost:3000");
});