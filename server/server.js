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
const app = express();
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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
