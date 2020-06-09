const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  location: Array,
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = Category = mongoose.model('categories', CategorySchema)
