
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cashier = require('../models/Cashier');
const router = express.Router();

// Middleware to check admin role
function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
}

router.get('/top-products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$products' },
      { $group: { _id: '$products.productId', totalSales: { $sum: '$products.quantity' } } },
      { $sort: { totalSales: -1 } },
      { $limit: 10 }
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/top-cashiers', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const topCashiers = await Order.aggregate([
      { $group: { _id: '$cashierId', totalSales: { $sum: '$total' } } },
      { $sort: { totalSales: -1 } },
      { $limit: 10 }
    ]);
    res.json(topCashiers);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/cashier-performance', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const performance = await Order.aggregate([
      { $group: { _id: '$cashierId', tasks: { $push: '$status' }, name: { $first: '$cashierName' } } }
    ]);
    res.json(performance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/cashier-activity', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/monthly-performance', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const monthlyPerformance = await Order.aggregate([
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          totalSales: { $sum: '$total' },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json(monthlyPerformance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;