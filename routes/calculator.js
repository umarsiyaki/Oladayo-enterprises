// routes/calculatorRoutes.js
const express = require('express');
const router = express.Router();
const CalculatorController = require('../controllers/CalculatorController');

router.post('/', CalculatorController.calculateTotal);

module.exports = router;