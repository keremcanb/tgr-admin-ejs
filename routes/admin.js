const express = require('express')
const router = express.Router()

const Place = require('../models/place')
const Location = require('../models/location')
const Category = require('../models/category')

// LIST & FORM
router.get('/', async (req, res) => {
  try {
    const places = await Place.find()
    const locations = await Location.find()
    const categories = await Category.find()

    res.render('listPlaces', {
      places,
      locations,
      categories
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/locations', async (req, res) => {
  const locations = await Location.find()

  res.render('listLocations', {
    locations
  })
})

router.get('/categories', async (req, res) => {
  const categories = await Category.find()
  const locations = await Location.find()

  res.render('listCategories', {
    categories,
    locations
  })
})

// FILTER
router.get('/filter', async (req, res) => {
  const places = await Place.find()
  const locations = await Location.find()
  const categories = await Category.find()
  const filter = locations.filter(arr => arr.title === places.location)

  res.render('listPlaces', {
    places,
    locations,
    categories,
    filter
  })
})

// ADD
router.post('/add-place', async (req, res) => {
  const place = new Place(req.body)

  await place.save()

  res.redirect('/admin')
})

router.post('/add-location', async (req, res) => {
  const place = new Location(req.body)

  await place.save()

  res.redirect('/admin/locations')
})

router.post('/add-category', async (req, res) => {
  const place = new Category(req.body)

  await place.save()

  res.redirect('/admin/categories')
})

// EDIT PLACE
router.get('/edit-place/:id', async (req, res) => {
  const place = await Place.findById(req.params.id)
  const locations = await Location.find()
  const categories = await Category.find()

  res.render('editPlace', { place, locations, categories })
})

router.post('/edit-place/:id', async (req, res) => {
  const { id } = req.params

  await Place.update({ _id: id }, req.body)

  res.redirect('/admin')
})

// EDIT LOC
router.get('/edit-location/:id', async (req, res) => {
  const location = await Location.findById(req.params.id)

  res.render('editLocation', { location })
})

router.post('/edit-location/:id', async (req, res) => {
  const { id } = req.params

  await Location.update({ _id: id }, req.body)

  res.redirect('/admin/locations')
})

// EDIT CAT
router.get('/edit-category/:id', async (req, res) => {
  const category = await Category.findById(req.params.id)

  const locations = await Location.find()

  res.render('editCategory', { category, locations })
})

router.post('/edit-category/:id', async (req, res) => {
  const { id } = req.params

  await Category.update({ _id: id }, req.body)

  res.redirect('/admin/categories')
})

// DELETE
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params

  await Place.deleteOne({ _id: id })
  await Category.deleteOne({ _id: id })
  await Location.deleteOne({ _id: id })

  res.redirect('/admin')
})

// DONE
// router.get('/turn/:id', async (req, res) => {
//   const { id } = req.params
//   const place = await Place.findById(id)
//   place.status = !place.status
//   await place.save()
//   res.redirect('/admin')
// })

// router.get('/turn/:id', async (req, res) => {
//   const { id } = req.params
//   const location = await Location.findById(id)
//   location.status = !location.status
//   await location.save()
//   res.redirect('/admin/locations')
// })

// router.get('/turn/:id', async (req, res) => {
//   const { id } = req.params
//   const category = await Category.findById(id)
//   category.status = !category.status
//   await category.save()
//   res.redirect('/admin/categories')
// })

module.exports = router
