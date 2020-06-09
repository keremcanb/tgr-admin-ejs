const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = Location = mongoose.model('locations', LocationSchema);
