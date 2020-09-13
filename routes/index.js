const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const sort = require("./modules/sort")


router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', restaurants)
router.use("/sort", sort)
router.use('/sort/name/restaurants', restaurants)
router.use('/sort/category/restaurants', restaurants)
router.use('/sort/location/restaurants', restaurants)
router.use('/sort/rating/restaurants', restaurants)

module.exports = router