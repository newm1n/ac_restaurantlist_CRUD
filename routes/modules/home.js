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

// search restaurant
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/");
  }

  const keywords = req.query.keywords;
  const keyword = req.query.keywords.trim().toLowerCase();

  Restaurant.find({})
    .lean()
    .then((restaurantsData) => {
      const filterRestaurantsData = restaurantsData.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      );
      res.render("index", { restaurantsData: filterRestaurantsData, keywords });
    })
    .catch((err) => console.log(err));
});

// 匯出路由模組
module.exports = router;
