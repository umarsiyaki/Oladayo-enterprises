const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Notification = require('../models/Notification');

// User dashboard route
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user_dashboard.html'));
});

// Cart operations
router.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  // Add product to user's cart logic
  res.json({ success: true, message: 'Product added to cart' });
});

// Live notifications and messaging
router.post('/notifications', (req, res) => {
  const { userId, message } = req.body;
  const notification = new Notification({ userId, message });
  notification.save().then(() => {
    res.json({ success: true, message: 'Notification sent' });
  });
});

router.post('/messages', (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const message = new Message({ senderId, receiverId, content });
  message.save().then(() => {
    res.json({ success: true, message: 'Message sent' });
  });
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});