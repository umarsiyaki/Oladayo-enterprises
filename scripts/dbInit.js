
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('../models/product');
const Order = require('../models/order');
const Location = require('../models/location');

const initializeDatabase = async () => {
try {
await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Database connected');

// Add initial data if needed
// e.g., await Product.create({ name: 'Coca-Cola', category: 'Soda', size: '500ml', price: 50, quantity: 100 });

console.log('Database initialized');
process.exit(0);
} catch (error) {
console.error('Database initialization failed:', error);
process.exit(1);
}
};

initializeDatabase();