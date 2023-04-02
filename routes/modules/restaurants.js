const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

// routes setting
// ceate page
router.get("/new", (req, res) => {
  res.render("new");
});

// add restaurant
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// edit content
router.get("/:restaurantId/edit", (req, res) => {
  const { restaurantId } = req.params;
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render("edit", { restaurantData }))
    .catch((err) => console.log(err));
});

// update content
router.put("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch((err) => console.log(err));
});

// delete restaurant
router.delete("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// view specific
router.get("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch((err) => console.log(err));
});

module.exports = router;
