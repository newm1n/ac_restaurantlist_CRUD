// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/Restaurant");

// routes setting
// view all
router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((err) => console.log(err));
});

// 匯出路由模組
module.exports = router;
