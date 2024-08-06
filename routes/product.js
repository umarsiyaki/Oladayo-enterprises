const express = require('express');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    size: String,
    quantity: Number,
    price: Number,
    imageUrl: String,
    description: String,
    vendor: String
});

module.exports = mongoose.model('Product', productSchema);


const express = require('express');

// Add product
router.post('/', async (req, res) => {
try {
const product = new Product(req.body);
await product.save();
res.status(201).json(product);
} catch (error) {
res.status(400).json({ error: error.message });
}
});

// Approve product (admin only)
router.patch('/:id/approve', async (req, res) => {
try {
const product = await Product.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
res.json(product);
} catch (error) {
res.status(400).json({ error: error.message });
}
});

// Get all approved products
router.get('/', async (req, res) => {
try {
const products = await Product.find({ approved: true });
res.json(products);
} catch (error) {
res.status(400).json({ error: error.message });
}
});


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

module.exports = router;
module.exports = router;