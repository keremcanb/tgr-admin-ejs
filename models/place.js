const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
  title: String,
  image: String,
  thumbnail: String,
  content: String,
  info: String,
  link: String,
  location: String,
  category: String,
  lat: Number,
  lng: Number,
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = Place = mongoose.model('places', PlaceSchema)
