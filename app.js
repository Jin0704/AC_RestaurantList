const express = require('express')
const session = require('express-session')
const router = express.Router()
const bodyParser = require('body-parser')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT
const exphbs = require('express-handlebars')
require('./config/mongoose')

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const restaurant = require('./models/restaurant')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(routes) //首頁路由


app.listen(PORT, () => {
  console.log(`RestaurantList is running on http://localhost:${PORT}`)
})
