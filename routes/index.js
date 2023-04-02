// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const restaurant = require("./modules/restaurant");

router.use("/", home);
router.use("/restaurants", restaurant);

// 匯出路由模組
module.exports = router;
