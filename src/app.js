const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
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
const bodyParser = require('body-parser');
const adminRoutes = require('../routes/admin');



// Middleware
app.use(bodyParser.json());

// Register routes
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server


const express = require('express');

// Route to home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Other routes for the updated pages
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/market.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user_dashboard.html'));
});

router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contact.html'));
});

router.get('/blogs', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/blogs.html'));
});

router.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/payment.html'));
});

router.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/receipt.html'));
});

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home'; // Example component
import About from './components/About'; // Example component
import AdminDashboard from '../react';
// Import other components as needed

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          {/* Navigation links */}
        </nav>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/calculator" component={calculator} />
            <Route path="/adminDashboard" component={AdminDashboard} />
            <Route path="/addCashier" component={addCashier} />
            <Route path="/message" component={message} />
            <Route path="/notifications" component={notifacatios} />
            {/* Define other routes here */}
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin'); // Ensure correct path

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Register routes
app.use('/api/admin', adminRoutes);

// Routes for static pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/market.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/user_dashboard.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

app.get('/blogs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/blogs.html'));
});

app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/payment.html'));
});

app.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/receipt.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin'); // Ensure correct path
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Register routes
app.use('/api/admin', adminRoutes);

// Routes for static pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/market.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/user_dashboard.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

app.get('/blogs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/blogs.html'));
});

app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/payment.html'));
});

app.get('/receipt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/receipt.html'));
});

// Middleware to log all activities
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ msg: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;

