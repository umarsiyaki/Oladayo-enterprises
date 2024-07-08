
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const router = express.Router();

// Middleware to check cashier role
function cashierMiddleware(req, res, next) {
  if (req.user.role !== 'cashier') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}

router.get('/orders', authMiddleware, cashierMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ cashierId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
