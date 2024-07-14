
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const location = new Location(req.body);
    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });

       

 Object.assign(location, req.body);
        await location.save();
        res.json(location);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });

        await location.remove();
        res.json({ message: 'Location deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const express = require('express');
const axios = require('axios');
const Location = require('../models/location');

const router = express.Router();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Add location
router.post('/', async (req, res) => {
try {
const { name, address } = req.body;
const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`);
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
