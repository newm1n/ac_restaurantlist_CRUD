const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes"); // 引用路由器
require("./config/mongoose");

const app = express();
const port = 3000;

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes); // 將 request 導入路由器

// start and listen on the Express server
app.listen(port, () => {
  console.log("App is running on http://localhost:3000");
});
