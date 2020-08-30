const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model('RestaurantData', restaurantSchema)