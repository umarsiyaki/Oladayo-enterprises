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