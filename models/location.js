const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('Location', locationSchema);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;