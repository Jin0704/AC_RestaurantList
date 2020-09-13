const express = require('express')

const router = express.Router()
const RestaurantData = require('../../models/restaurant')


router.get('/', (req, res) => {
  RestaurantData.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})


module.exports = router