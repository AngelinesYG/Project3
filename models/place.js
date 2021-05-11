const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
   name: String,
   image: {type: String, default: 'https://via.placeholder.com/150'},
   city: String,
   country: String,
   description: String,
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
