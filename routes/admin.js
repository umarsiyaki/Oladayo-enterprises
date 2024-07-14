const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order'); // Assuming you have an Order model
const Cashier = require('../models/Cashier'); // Assuming you have a Cashier model
const router = express.Router();

// Get Top Selling Products
router.get('/top-products', authMiddleware, async (req, res) => {
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

// Get Top Cashiers
router.get('/top-cashiers', authMiddleware, async (req, res) => {
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

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Monthly Business Performance
router.get('/monthly-performance', authMiddleware, async (req, res) => {
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
