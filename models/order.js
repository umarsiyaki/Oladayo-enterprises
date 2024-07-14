
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productList: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    totalAmount: Number,
    status: { type: String, default: 'Pending' },
    paymentMethod: String,
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
quantity: { type: Number, required: true },
totalAmount: { type: Number, required: true },
paymentMode: { type: String, required: true },
status: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
name: { type: String, required: true },
category: { type: String, required: true },
size: { type: String, required: true },
price: { type: Number, required: true },
quantity: { type: Number, required: true },
approved: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;