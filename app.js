const express = require('express')
const router = express.Router()
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const RestaurantData = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('Something wrong')
})
db.once('open', () => {
  console.log('Is connecting Mongodb')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes) //首頁路由


app.listen(port, () => {
  console.log(`RestaurantList is running on http://localhost:${port}`)
})
