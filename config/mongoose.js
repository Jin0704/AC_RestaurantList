const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Something wrong')
})
db.once('open', () => {
  console.log('Is connecting Mongodb')
})

module.exports = db