const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const sort = require("./modules/sort")
const users = require('./user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants) // 加入驗證程序
router.use('/users', users)
router.use('/auth', auth)
// 加入驗證程序
router.use('/', authenticator, home)
// router.use('/', home)
// router.use('/restaurants', restaurants)
router.use('/search', restaurants)
router.use("/sort", sort)
router.use('/sort/name/restaurants', restaurants)
router.use('/sort/category/restaurants', restaurants)
router.use('/sort/location/restaurants', restaurants)
router.use('/sort/rating/restaurants', restaurants)
router.use('/users', users)

module.exports = router