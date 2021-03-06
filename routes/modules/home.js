const express = require('express')

const router = express.Router()
const RestaurantData = require('../../models/restaurant')


router.get('/', (req, res) => {
  const userId = req.user._id
  RestaurantData.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})


module.exports = router