const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./public/restaurant.json')
const mongoose = require('mongoose')
const RestaurantData = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')



mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('Something wrong')
})
db.once('open', () => {
  console.log('Is connecting')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurantList.results, })
// })

app.get('/', (req, res) => {
  RestaurantData.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('detail', { restaurants }))
    .catch(error => console.log(error))
})

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   if (req.params.restaurant_id <= restaurantList.results.length) {
//     res.render('show', { restaurant: restaurant })

//   }
// })

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const location = req.body.location
  const phone = req.body.phone
  return RestaurantData.create({ name, location, phone })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const location = req.body.location
  const phone = req.body.phone
  return RestaurantData.findById(id)
    .then(restaurants => {
      restaurants.name = name
      restaurants.location = location
      restaurants.phone = phone
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantData.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`RestaurantList is running on http://localhost:${port}`)
})

