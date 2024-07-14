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
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
