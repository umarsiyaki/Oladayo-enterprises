const express = require('express');
const router = express.Router();

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

module.exports = router;