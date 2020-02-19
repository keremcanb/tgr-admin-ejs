const express = require('express')
const router = express.Router()

const Place = require('../models/place')
const Location = require('../models/location')
const Category = require('../models/category')

router.get('/places', (req, res) => {
  Place.find((err, result) => {
    if (err) return console.log(err)
  }).then(result => {
    res.send(result)
  })
})

router.get('/locations', (req, res) => {
  Location.find((err, result) => {
    if (err) return console.log(err)
  }).then(result => {
    res.send(result)
  })
})

router.get('/categories', (req, res) => {
  Category.find((err, result) => {
    if (err) return console.log(err)
  }).then(result => {
    res.send(result)
  })
})

module.exports = router
