document.addEventListener('DOMContentLoaded', function() {
  const productName = document.getElementById('product-name');
  const category = document.getElementById('category');
  const size = document.getElementById('size');
  const type = document.getElementById('type');
  const price = document.getElementById('price');
  const quantity = document.getElementById('quantity');
  const countAddBtn = document.getElementById('count-add-btn');
  const countSubtractBtn = document.getElementById('count-subtract-btn');
  const countMultiplyBtn = document.getElementById('count-multiply-btn');
  const updateProductBtn = document.getElementById('update-product-btn');
  const totalProducts = document.getElementById('total-products');
  const updatedDetails = document.getElementById('updated-details');

  let totalQuantity = 0;

  countAddBtn.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) + 1;
  });

  countSubtractBtn.addEventListener('click', () => {
    if (parseInt(quantity.value) > 1) {
      quantity.value = parseInt(quantity.value) - 1;
    }
  });

  countMultiplyBtn.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) * 2;
  });

  updateProductBtn.addEventListener('click', () => {
    const productDetails = {
      name: productName.value,
      category: category.value,
      size: size.value,
      type: type.value,
      price: parseFloat(price.value),
      quantity: parseInt(quantity.value)
    };

    // Order completion logic
function completeOrder(orderDetails) {
  // Notify admin and cashier
  const notificationMessage = `New order from ${orderDetails.username}. Order ID: ${orderDetails.id}`;
  socket.emit('send notification', notificationMessage);

  // Show the receipt
  showReceipt(orderDetails);
}


    totalQuantity += productDetails.quantity;

    totalProducts.textContent = `Total Products: ${totalQuantity}`;
    updatedDetails.textContent = `Updated Details: ${JSON.stringify(productDetails)}`;

    // Update the product details in the backend (placeholder)
    // Use fetch or another method to send the data to the server
  });
});


document.addEventListener('DOMContentLoaded', function() {
const notificationsDropdown = document.getElementById('notifications');
const messagingWindow = document.getElementById('messaging-window');
const openMessagingBtn = document.getElementById('open-messaging-btn');
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message-btn');
const messages = document.getElementById('messages');

function showNotification(message) {
const notification = document.createElement('div');
notification.className = 'notification';
notification.textContent = message;
notificationsDropdown.appendChild(notification);
}

function addMessage(sender, content) {
const message = document.createElement('div');
message.className = 'message';
message.innerHTML = `<strong>${sender}:</strong> ${content}`;
messages.appendChild(message);
}

openMessagingBtn.addEventListener('click', () => {
messagingWindow.classList.toggle('open');
});

sendMessageBtn.addEventListener('click', () => {
const content = messageInput.value;
if (content) {
addMessage('You', content);
// Simulate sending the message to the server
setTimeout(() => {
addMessage('Admin', `Response to: ${content}`);
}, 1000);
messageInput.value = '';
}
});

// Simulate receiving notifications
setInterval(() => {
showNotification('New notification received.');
}, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar
  const sidebarToggle = document.querySelector(".sidebar-toggler");
  if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
          document.querySelector(".sidebar").classList.toggle("open");
      });
  }

  // Fetch and display cashier-related data
  fetchCashierData();

  function fetchCashierData() {
      // Example fetch for cashier data
      fetch('/api/cashier/data')
          .then(response => response.json())
          .then(data => {
              // Populate the page with data
              document.getElementById('today-sale').innerText = `$${data.todaySale}`;
              document.getElementById('total-sale').innerText = `$${data.totalSale}`;
              document.getElementById('today-revenue').innerText = `$${data.todayRevenue}`;
              document.getElementById('total-revenue').innerText = `$${data.totalRevenue}`;
              // Populate recent sales
              populateRecentSales(data.recentSales);
          })
          .catch(error => console.error('Error fetching cashier data:', error));
  }

  function populateRecentSales(sales) {
      const salesTableBody = document.querySelector("#recent-sales tbody");
      salesTableBody.innerHTML = "";
      sales.forEach(sale => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${sale.date}</td>
              <td>${sale.invoice}</td>
              <td>${sale.customer}</td>
              <td>${sale.amount}</td>
              <td>${sale.status}</td>
              <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          salesTableBody.appendChild(row);
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

  // Fetch and display cashier-related data
  fetchCashierData();

  function fetchCashierData() {
      // Example fetch for cashier data
      fetch('/api/cashier/data')
          .then(response => response.json())
          .then(data => {
              // Populate the page with data
              document.getElementById('today-sale').innerText = `$${data.todaySale}`;
              document.getElementById('total-sale').innerText = `$${data.totalSale}`;
              document.getElementById('today-revenue').innerText = `$${data.todayRevenue}`;
              document.getElementById('total-revenue').innerText = `$${data.totalRevenue}`;
              // Populate recent sales
              populateRecentSales(data.recentSales);
          })
          .catch(error => console.error('Error fetching cashier data:', error));
  }

  function populateRecentSales(sales) {
      const salesTableBody = document.querySelector("#recent-sales tbody");
      salesTableBody.innerHTML = "";
      sales.forEach(sale => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${sale.date}</td>
              <td>${sale.invoice}</td>
              <td>${sale.customer}</td>
              <td>${sale.amount}</td>
              <td>${sale.status}</td>
              <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          salesTableBody.appendChild(row);
      });
  }
});

// cashier.js

document.addEventListener('DOMContentLoaded', () => {
  // Fetch initial data for cashier dashboard
  fetchDashboardData();

  // Event listeners for navigation
  document.querySelector('a[href="addproduct.html"]').addEventListener('click', () => navigateToPage('addproduct.html'));
  document.querySelector('a[href="calculator.html"]').addEventListener('click', () => navigateToPage('calculator.html'));
  document.querySelector('a[href="widget.html"]').addEventListener('click', () => navigateToPage('widget.html'));
  document.querySelector('a[href="form.html"]').addEventListener('click', () => navigateToPage('form.html'));
  document.querySelector('a[href="table.html"]').addEventListener('click', () => navigateToPage('table.html'));
  document.querySelector('a[href="chart.html"]').addEventListener('click', () => navigateToPage('chart.html'));
  document.querySelector('a[href="marketing.html"]').addEventListener('click', () => navigateToPage('marketing.html'));
  document.querySelector('a[href="payment.html"]').addEventListener('click', () => navigateToPage('payment.html'));
  document.querySelector('a[href="receipt.html"]').addEventListener('click', () => navigateToPage('receipt.html'));
});

// Fetch initial data for the dashboard
function fetchDashboardData() {
  // Dummy data fetch - Replace with actual server call
  const notificationCount = 2;
  const messageCount = 4;

  updateNotificationCount(notificationCount);
  updateMessageCount(messageCount);
}

document.addEventListener('DOMContentLoaded', () => {
  const addProductForm = document.getElementById('addProductForm');

  // Add Product Form Submit Listener
  if (addProductForm) {
      addProductForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Get form data
          const vendorCategory = document.getElementById('vendorCategory').value;
          const brandCategory = document.getElementById('brandCategory').value;
          const productSize = document.getElementById('productSize').value;
          const productName = document.getElementById('productName').value;
          const productPrice = document.getElementById('productPrice').value;

          const newProduct = {
              id: Date.now(), // unique ID for the product
              vendorCategory,
              brandCategory,
              productSize,
              productName,
              productPrice
          };

          // Fetch current inventory from localStorage or initialize empty array if not present
          let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

          // Add new product to inventory
          inventory.push(newProduct);

          // Save updated inventory back to localStorage
          localStorage.setItem('inventory', JSON.stringify(inventory));

          // Notify admin or cashier (for simplicity, just log to console here)
          console.log('Product added successfully:', newProduct);

          // Optionally, reset form after submission
          addProductForm.reset();
      });
  }

  // Notification Listener
  const notificationDropdown = document.getElementById('notificationDropdown');
  if (notificationDropdown) {
      notificationDropdown.addEventListener('click', () => {
          console.log('Notification dropdown clicked');
          // Fetch and display notifications
          // (Assuming a function fetchNotifications exists to get notifications from the server)
          fetchNotifications();
      });
  }

  // Message Listener
  const messageDropdown = document.getElementById('messageDropdown');
  if (messageDropdown) {
      messageDropdown.addEventListener('click', () => {
          console.log('Message dropdown clicked');
          // Fetch and display messages
          // (Assuming a function fetchMessages exists to get messages from the server)
          fetchMessages();
      });
  }

  // Sidebar Toggle
  const sidebarToggler = document.querySelector('.sidebar-toggler');
  if (sidebarToggler) {
      sidebarToggler.addEventListener('click', () => {
          document.querySelector('.sidebar').classList.toggle('collapsed');
      });
  }
});

// profile management

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

function addAdmin(newAdminDetails) {
  fetch('/add-admin', {
      method: 'POST',
      body: JSON.stringify(newAdminDetails),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Admin added successfully');
      } else {
          alert('Error adding admin');
      }
  });
}

function removeAdmin(adminId) {
  fetch(`/remove-admin/${adminId}`, {
      method: 'DELETE'
  }).then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Admin removed successfully');
      } else {
          alert('Error removing admin');
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