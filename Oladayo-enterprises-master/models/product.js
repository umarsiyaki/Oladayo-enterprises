const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    size: String,
    category: String,
    price: Number,
    quantity: Number
});

const Product = mongoose.model('Product', ProductSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
module.exports = Product;