
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Define your routes
router.get('/', messageController.getMessages);
router.post('/', messageController.sendMessage);

module.exports = router;