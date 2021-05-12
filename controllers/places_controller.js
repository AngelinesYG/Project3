const express = require('express')
const places = express.Router()
const Place = require('../models/place.js')
const placeSeed = require('../models/place_seed.js')

places.get('/', (req, res) => {
  Place.find({}, (err, foundPlaces) => {
    res.json(foundPlaces)
  })
})

places.post('/', (req, res) => {
  Place.create(req.body, (err, createPlace) => {
    Place.find({}, (err, foundPlace) => {
      res.json(foundPlace)
    })
  })
})

places.get('/seed', (req, res) => {
  Place.insertMany(placeSeed, (err, manyPlaces) => {
    res.redirect('/places')
  })
})

places.put('/:id', (req, res) => {
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

places.delete('/:id', (req, res) => {
  Place.findByIdAndRemove(req.params.id, (err, deletedPlace) => {
    Place.find({}, (err, foundPlaces) => {
      res.json(foundPlaces)
    })
  })
})









module.exports = places
