const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');



// Middleware to log activities


router.use(logActivity);

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
    console.error('Error fetching top products:', err);
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
    console.error('Error fetching top cashiers:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    console.error('Error fetching cashier activity:', err);
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
    console.error('Error fetching monthly performance:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Product Details
router.put('/updateProduct/:productId', authMiddleware, (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;

  Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true })
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(error => {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Add New Cashier
router.post('/addCashier', authMiddleware, (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;

  const newCashier = new Cashier({ username, email, phoneNumber, address, password });
  newCashier.save()
    .then(result => res.json({ success: true, cashier: result }))
    .catch(error => {
      console.error('Error adding cashier:', error);
      res.status(500).json({ success: false, error });
    });
});

// Additional futuristic features
// 1. Logging all activities
// 2. Enhanced error handling with specific messages
// 3. Possibly more endpoints for other functionalities

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order'); // Assuming you have an Order model
 // Assuming you have a Product model



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
    console.error('Error fetching top products:', err);
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
    console.error('Error fetching top cashiers:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    console.error('Error fetching cashier activity:', err);
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
    console.error('Error fetching monthly performance:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Example route to update product details
router.put('/updateProduct/:productId', authMiddleware, (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;

  // Implement logic to update product in database
  Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true })
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(error => {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// POST route to add new cashier
router.post('/addCashier', authMiddleware, (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;

  const newCashier = new Cashier({ username, email, phoneNumber, address, password });
  newCashier.save()
    .then(result => res.json({ success: true, cashier: result }))
    .catch(error => {
      console.error('Error adding cashier:', error);
      res.status(500).json({ success: false, error });
    });
});

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Middleware to log activities


router.use(logActivity);

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
    console.error('Error fetching top products:', err);
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
    console.error('Error fetching top cashiers:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    console.error('Error fetching cashier activity:', err);
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
    console.error('Error fetching monthly performance:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Product Details
router.put('/updateProduct/:productId', authMiddleware, (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;

  Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true })
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(error => {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Add New Cashier
router.post('/addCashier', authMiddleware, (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;

  const newCashier = new Cashier({ username, email, phoneNumber, address, password });
  newCashier.save()
    .then(result => res.json({ success: true, cashier: result }))
    .catch(error => {
      console.error('Error adding cashier:', error);
      res.status(500).json({ success: false, error });
    });
});

// Additional futuristic features
// 1. Logging all activities
// 2. Enhanced error handling with specific messages
// 3. Possibly more endpoints for other functionalities

const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cashier = require('../models/Cashier');
const Product = require('../models/Product'); // Ensure correct path

// Middleware to log activities


router.use(logActivity);

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
    console.error('Error fetching top products:', err);
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
    console.error('Error fetching top cashiers:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    console.error('Error fetching cashier activity:', err);
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
    console.error('Error fetching monthly performance:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Product Details
router.put('/updateProduct/:productId', authMiddleware, async (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add New Cashier
router.post('/addCashier', authMiddleware, async (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;

  try {
    const newCashier = new Cashier({ username, email, phoneNumber, address, password });
    const result = await newCashier.save();
    res.json({ success: true, cashier: result });
  } catch (error) {
    console.error('Error adding cashier:', error);
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;

const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cashier = require('../models/Cashier');
const Product = require('../models/Product');



router.use(logActivity);

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
    console.error('Error fetching top products:', err);
    res.status(500).json({ msg: 'Error fetching top products' });
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
    console.error('Error fetching top cashiers:', err);
    res.status(500).json({ msg: 'Error fetching top cashiers' });
  }
});

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    console.error('Error fetching cashier activity:', err);
    res.status(500).json({ msg: 'Error fetching cashier activity' });
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
    console.error('Error fetching monthly performance:', err);
    res.status(500).json({ msg: 'Error fetching monthly performance' });
  }
});

// Update Product Details
router.put('/updateProduct/:productId', authMiddleware, async (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ msg: 'Error updating product' });
  }
});

// Add New Cashier
router.post('/addCashier', authMiddleware, async (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;

  try {
    const newCashier = new Cashier({ username, email, phoneNumber, address, password });
    const result = await newCashier.save();
    res.json({ success: true, cashier: result });
  } catch (error) {
    console.error('Error adding cashier:', error);
    res.status(500).json({ success: false, msg: 'Error adding cashier', error });
  }
});

// Example additional endpoint: Get Products by Category
router.get('/products/category/:category', authMiddleware, async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ msg: 'Error fetching products by category' });
  }
});


const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Product = require('../models/Product'); // Ensure correct path
const Cashier = require('../models/Cashier');
const router = express.Router();

// Middleware to log activities
const logActivity = (req, res, next) => {
  console.log(`${req.method} request to ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
};

router.use(logActivity);

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
    console.error('Error fetching top products:', err);
    res.status(500).json({ msg: 'Error fetching top products' });
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
    console.error('Error fetching top cashiers:', err);
    res.status(500).json({ msg: 'Error fetching top cashiers' });
  }
});

// Get Cashier Activity
router.get('/cashier-activity', authMiddleware, async (req, res) => {
  try {
    const cashierActivity = await Cashier.find({}).select('name activity');
    res.json(cashierActivity);
  } catch (err) {
    console.error('Error fetching cashier activity:', err);
    res.status(500).json({ msg: 'Error fetching cashier activity' });
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
    console.error('Error fetching monthly performance:', err);
    res.status(500).json({ msg: 'Error fetching monthly performance' });
  }
});

// Update Product Details
router.put('/updateProduct/:productId', authMiddleware, async (req, res) => {
  const productId = req.params.productId;
  const { name, size, category, price, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, size, category, price, quantity }, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ msg: 'Error updating product' });
  }
});

// Add New Cashier
router.post('/addCashier', authMiddleware, async (req, res) => {
  const { username, email, phoneNumber, address, password } = req.body;

  try {
    const newCashier = new Cashier({ username, email, phoneNumber, address, password });
    const result = await newCashier.save();
    res.json({ success: true, cashier: result });
  } catch (error) {
    console.error('Error adding cashier:', error);
    res.status(500).json({ success: false, msg: 'Error adding cashier', error });
  }
});

// Example additional endpoint: Get Products by Category
router.get('/products/category/:category', authMiddleware, async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ msg: 'Error fetching products by category' });
  }
});

module.exports = router;
module.exports = router;
