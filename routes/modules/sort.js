const express = require('express')
const router = express.Router()
const RestaurantData = require('../../models/restaurant')

router.get("/name/:method", (req, res) => {
  const method = req.params.method

  RestaurantData.find()
    .lean()
    .sort({ name: [method] })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(err => console.error(err))
})


router.get("/category/asc", (req, res) => {
  RestaurantData.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(err => console.error(err))
})


router.get("/location/asc", (req, res) => {
  RestaurantData.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(err => console.error(err))
})


router.get("/rating/:method", (req, res) => {
  const method = req.params.method

  RestaurantData.find()
    .lean()
    .sort({ rating: [method] })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(err => console.error(err))
})



module.exports = router