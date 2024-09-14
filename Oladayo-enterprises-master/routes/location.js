const express = require('express');
const axios = require('axios');
const Location = require('../models/location');
const router = express.Router();

// Google Maps API key

// Add a new location
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    // Fetch coordinates (latitude, longitude) from Google Maps Geocoding API
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY
      }
    });
   const { lat, lng } = response.data.results[0].geometry.location;

    // Create new location object with name, address, and coordinates
    const location = new Location({ name, address, coordinates: { lat, lng } })
  // Save location to MongoDB
    await location.save();

    // Respond with the saved location data
    res.status(201).json(location);
  } catch (error) {
    // Handle errors during location creation
    res.status(400).json({ error: error.message });
  }
});

// Get all locations
router.get('/', async (req, res) => {
  try {
    // Fetch all locations from MongoDB
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    // Handle errors during location retrieval
    res.status(400).json({ error: error.message });
  }
});


const express = require('express');
const axios = require('axios');
const Location = require('../models/location');

// Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Add a new location
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY
      }
    });
    const { lat, lng } = response.data.results[0].geometry.location;

    const location = new Location({ name, address, coordinates: { lat, lng } });
    await location.save();

    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
module.exports = router;
