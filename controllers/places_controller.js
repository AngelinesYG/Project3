const express = require('express')
const place = express.Router()
const Place = require('../models/place.js')
const placeSeed = require('../models/place_seed.js')

place.get('/', (req, res) => {
  Place.find({}, (err, foundPlaces) => {
    res.json(foundPlaces)
  })
})

place.post('/', (req, res) => {
  Place.create(req.body, (err, createPlace) => {
    Place.find({}, (err, foundPlace) => {
      res.json(foundPlace)
    })
  })
})

place.get('/seed', (req, res) => {
  Place.insertMany(placeSeed, (err, manyPlaces) => {
    res.redirect('/place')
  })
})

place.put('/:id', (req, res) => {
  Place.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPlace) => {
      if (err) {
        res.send(err)
      } else {
        Place.find({}, (err, foundPlaces) => {
          res.json(foundPlaces)
        })
      }
    }
  )
})

place.delete('/:id', (req, res) => {
  Place.findByIdAndRemove(req.params.id, (err, deletedPlace) => {
    Place.find({}, (err, foundPlaces) => {
      res.json(foundPlaces)
    })
  })
})









module.exports = place
