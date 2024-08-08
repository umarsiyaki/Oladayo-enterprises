require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const NodeCache = require('node-cache');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const locationRoutes = require('./routes/locations');
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
const cache = new NodeCache();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Caching middleware
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    res.send(cachedResponse);
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      cache.set(key, body, 60 * 10); // Cache for 10 minutes
      res.originalSend(body);
    };
    next();
  }
};
app.use(cacheMiddleware);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//reciept documentations

document.addEventListener('DOMContentLoaded', function() {
    // ... Existing code ...
  
    // Order completion logic
    function completeOrder(orderDetails) {
      // Display the receipt modal
      const receiptModal = document.getElementById('receipt-modal');
      const receiptContent = document.getElementById('receipt-content');
      
      // Populate the receipt content
      receiptContent.innerHTML = `
        <p><strong>Order ID:</strong> ${orderDetails.id}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Customer:</strong> ${orderDetails.username}</p>
        <h3>Products</h3>
        <ul>
          ${orderDetails.products.map(product => `
            <li>${product.name} - ${product.quantity} x $${product.price} = $${product.quantity * product.price}</li>
          `).join('')}
        </ul>
        <p><strong>Total:</strong> $${orderDetails.total}</p>
      `;
      
      receiptModal.style.display = 'block';
  
      // Notify admin and cashier
      // Send a notification via your notification system or API
      const notificationMessage = `New order from ${orderDetails.username}. Order ID: ${orderDetails.id}`;
      socket.emit('send notification', notificationMessage);
    }
  
    // Close the receipt modal
    document.getElementById('close-receipt-btn').addEventListener('click', function() {
      document.getElementById('receipt-modal').style.display = 'none';
    });
  
    // Example order completion handler
    document.getElementById('complete-order-btn').addEventListener('click', function() {
      const orderDetails = {
        id: '12345',
        username: 'john_doe',
        products: [
          { name: 'Product 1', quantity: 2, price: 10 },
          { name: 'Product 2', quantity: 1, price: 20 }
        ],
        total: 40
      };
      completeOrder(orderDetails);
    });
  
    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
      const modal = document.getElementById('receipt-modal');
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    // Existing code for notifications and messaging...
  });
  // Order completion logic
function completeOrder(orderDetails) {
    // Notify admin and cashier
    const notificationMessage = `New order from ${orderDetails.username}. Order ID: ${orderDetails.id}`;
    socket.emit('send notification', notificationMessage);
  
    // Show the receipt
    showReceipt(orderDetails);
  }
  
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar
  const sidebarToggle = document.querySelector(".sidebar-toggler");
  if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
          document.querySelector(".sidebar").classList.toggle("open");
      });
  }

  // Fetch and display user-related data
  fetchUserData();

  function fetchUserData() {
      // Example fetch for user data
      fetch('/api/user/data')
          .then(response => response.json())
          .then(data => {
              // Populate the page with data
              document.getElementById('today-purchase').innerText = `$${data.todayPurchase}`;
              document.getElementById('total-purchase').innerText = `$${data.totalPurchase}`;
              document.getElementById('today-spent').innerText = `$${data.todaySpent}`;
              document.getElementById('total-spent').innerText = `$${data.totalSpent}`;
              // Populate recent purchases
              populateRecentPurchases(data.recentPurchases);
          })
          .catch(error => console.error('Error fetching user data:', error));
  }

  function populateRecentPurchases(purchases) {
      const purchasesTableBody = document.querySelector("#recent-purchases tbody");
      purchasesTableBody.innerHTML = "";
      purchases.forEach(purchase => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${purchase.date}</td>
              <td>${purchase.invoice}</td>
              <td>${purchase.vendor}</td>
              <td>${purchase.amount}</td>
              <td>${purchase.status}</td>
              <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          purchasesTableBody.appendChild(row);
      });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Sidebar
  const sidebarToggle = document.querySelector(".sidebar-toggler");
  if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
          document.querySelector(".sidebar").classList.toggle("open");
      });
  }

  // Fetch and display user-related data
  fetchUserData();

  function fetchUserData() {
      // Example fetch for user data
      fetch('/api/user/data')
          .then(response => response.json())
          .then(data => {
              // Populate the page with data
              document.getElementById('today-purchase').innerText = `$${data.todayPurchase}`;
              document.getElementById('total-purchase').innerText = `$${data.totalPurchase}`;
              document.getElementById('today-spent').innerText = `$${data.todaySpent}`;
              document.getElementById('total-spent').innerText = `$${data.totalSpent}`;
              // Populate recent purchases
              populateRecentPurchases(data.recentPurchases);
          })
          .catch(error => console.error('Error fetching user data:', error));
  }

  function populateRecentPurchases(purchases) {
      const purchasesTableBody = document.querySelector("#recent-purchases tbody");
      purchasesTableBody.innerHTML = "";
      purchases.forEach(purchase => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${purchase.date}</td>
              <td>${purchase.invoice}</td>
              <td>${purchase.vendor}</td>
              <td>${purchase.amount}</td>
              <td>${purchase.status}</td>
              <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          purchasesTableBody.appendChild(row);
      });
  }
});

              // Populate the page with data

              //profile management
              document.getElementById('profile').addEventListener('click', () => {
                // Logic to open the profile modal or page
                // Fetch current profile details and populate the form
                // Allow user to update details
            });
            
            function updateProfile(newDetails) {
                // Update the user profile with new details
                // Send updated details to the server
                fetch('/update-profile', {
                    method: 'POST',
                    body: JSON.stringify(newDetails),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Profile updated successfully');
                    } else {
                        alert('Error updating profile');
                    }
                });
            }
                          // Toggle dark/light mode

            document.getElementById('settings').addEventListener('click', () => {
              // Logic to open the settings modal or page
              // Toggle dark/light mode
              const currentMode = localStorage.getItem('theme') || 'light';
              if (currentMode === 'light') {
                  setDarkMode();
              } else {
                  setLightMode();
              }
          });

          

function setDarkMode() {
  document.body.classList.add('dark-mode');
  document.body.classList.remove('light-mode');
  localStorage.setItem('theme', 'dark');
}

function setLightMode() {
  document.body.classList.add('light-mode');
  document.body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
}

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      setDarkMode();
  } else {
      setLightMode();
  }
});

document.getElementById('login_logout').addEventListener('click', () => {
  // Logic to log the user out
  fetch('/logout', {
      method: 'POST'
  }).then(response => {
      if (response.ok) {
          window.location.href = 'signin.html';
      } else {
          alert('Error logging out');
      }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeButton = document.getElementById('toggleThemeButton');
  const logoutButton = document.getElementById('logoutButton');

  // Load theme preference from localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.className = currentTheme;

  toggleThemeButton.addEventListener('click', () => {
    const newTheme = document.body.className === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
  });
});