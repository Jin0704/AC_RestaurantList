const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
require('./config/mongoose')

const routes = require('./routes')
require('./config/mongoose')
const restaurant = require('./models/restaurant')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes) //首頁路由


app.listen(PORT, () => {
  console.log(`RestaurantList is running on http://localhost:${PORT}`)
})
