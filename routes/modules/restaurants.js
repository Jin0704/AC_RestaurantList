const express = require('express')
const router = express.Router()
const RestaurantData = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })
    .lean()
    .then((restaurants) => res.render('detail', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  RestaurantData.find()
    .lean()
    .then(restaurants => {
      const restaurantdata = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: restaurantdata, keyword })
    })
    .catch(error => console.log(error))
})



router.post('', (req, res) => {
  const userId = req.user._id
  const { name, location, phone, category, rating, description, image } = req.body
  return RestaurantData.create({ name, location, phone, category, rating, description, image, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
  console.log(RestaurantData)
})

router.post('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, location, phone, category, rating, description, image } = req.body
  return RestaurantData.findOne({ _id, userId })
    .then(restaurants => {
      restaurants.name = name
      restaurants.location = location
      restaurants.phone = phone
      restaurants.category = category
      restaurants.rating = rating
      restaurants.description = description
      restaurants.image = image
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router