const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  title: String,
  image: String,
  location: Array,
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = Category = mongoose.model('categories', CategorySchema)
