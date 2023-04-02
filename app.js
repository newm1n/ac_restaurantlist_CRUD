const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

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

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

// routes setting
// view all
app.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});

// view specific
app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch((err) => console.log(err));
});

// create page
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});

// add restaurant
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// start and listen on the Express server
app.listen(port, () => {
  console.log("App is running on http://localhost:3000");
});
