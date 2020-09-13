const express = require('express')
const router = express.Router()
const RestaurantData = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
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
  return RestaurantData.create({ ...req.body })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
  console.log(RestaurantData)
})

router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
    .then(restaurants => {
      restaurants.name = req.body.name
      restaurants.location = req.body.location
      restaurants.phone = req.body.phone
      restaurants.category = req.body.category
      restaurants.rating = req.body.rating
      restaurants.description = req.body.description
      restaurants.image = req.body.image
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router