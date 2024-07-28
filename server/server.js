require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const locationRoutes = require('./routes/locations');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const cashierRoutes = require('./routes/cashier');
const paymentRoutes = require('./routes/payment');
const indexRoutes = require('./routes/index');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Notification = require('./models/Notification');
const Message = require('./models/Message');

// Initialize app
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/locations', locationRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/cashier', cashierRoutes);
app.use('/payment', paymentRoutes);
app.use('/', indexRoutes);

// Serve HTML files
const serveHTML = (route, file) => app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'public', file)));
serveHTML('/', 'index.html');
serveHTML('/admin', 'admin.html');
serveHTML('/cashier', 'cashier.html');
serveHTML('/user', 'user.html');
serveHTML('/register', 'register.html');
serveHTML('/login', 'login.html');
serveHTML('/market', 'market.html');
serveHTML('/payment', 'payment.html');
serveHTML('/receipt', 'receipt.html');
serveHTML('/blogs', 'blogs.html');

// Live notifications and messaging
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send message', (msg) => {
    io.emit('receive message', msg);
  });
  socket.on('send notification', (notification) => {
    io.emit('receive notification', notification);
  });
});

// Error handling
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server

const express = require('express');
const connectDB = require('./dbinit');

// Load environment variables
require('dotenv').config();

// Connect to the database
connectDB();

// Middleware and routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route files
const locationRoutes = require('./routes/location');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');

// Use route files
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let products = [
  // Sample products
  { id: '1', name: 'Energy Drink', description: 'Refreshing drink.', price: 2.5, image: 'path/to/image1.jpg', category: 'Energy Drinks', size: '500ml', vendor: 'Vendor A' },
  // Add more products
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { id, name, description, price, image, category, size, vendor } = req.body;
  const newProduct = { id, name, description, price, image, category, size, vendor };
  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully.' });
});

// Update an existing product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, size, vendor } = req.body;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { id, name, description, price, image, category, size, vendor };
    res.json({ message: 'Product updated successfully.' });
  } else {
    res.status(404).json({ message: 'Product not found.' });
  }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({ message: 'Product deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Product not found.' });
  }
});

// Search products
app.get('/api/products/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.size.toLowerCase().includes(query) ||
    product.vendor.toLowerCase().includes(query)
  );
  res.json(filteredProducts);
});

// Serve the market.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'market.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/advanced-implementation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Define routes
const productRoutes = require('./routes/productRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
app.use('/api/blog', blogPostRoutes);
app.use('/api/users', userRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/products', (req, res) => {
  // save product data to database
  res.json({ message: 'Product added successfully' });
});

app.post('/api/calculator', (req, res) => {
  // calculate total amount and number per product
  res.json({ totalAmount: 100, numberPerProduct: 5 });
});

app.post('/api/blog', (req, res) => {
  // save blog data to database
  res.json({ message: 'Blog posted successfully' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

