const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    size: String,
    category: String,
    price: Number,
    quantity: Number
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;