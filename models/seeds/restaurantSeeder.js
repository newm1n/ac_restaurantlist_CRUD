const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantList = require("../../restaurant.json").results;

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("running restaurantSeeder script...");

  Restaurant.create(restaurantList)
    .then(() => {
      console.log("Done.");
      db.close();
    })
    .catch((err) => console.log(err));
});
