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

  if (countAddBtn && countSubtractBtn && countMultiplyBtn && quantity) {
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
  }

  if (updateProductBtn) {
    updateProductBtn.addEventListener('click', () => {
      const productDetails = {
        name: productName.value,
        category: category.value,
        size: size.value,
        type: type.value,
        price: parseFloat(price.value),
        quantity: parseInt(quantity.value)
      };

      totalQuantity += productDetails.quantity;

      totalProducts.textContent = `Total Products: ${totalQuantity}`;
      updatedDetails.textContent = `Updated Details: ${JSON.stringify(productDetails)}`;

      // Update the product details in the backend (placeholder)
      // Use fetch or another method to send the data to the server
    });
  }

if (updateProductBtn) {
  updateProductBtn.addEventListener('click', () => {
    const productDetails = {
      name: document.getElementById('product-name').value,
      category: document.getElementById('category').value,
      size: document.getElementById('size').value,
      type: document.getElementById('type').value,
      price: parseFloat(document.getElementById('price').value),
      quantity: parseInt(document.getElementById('quantity').value)
    };

    let totalQuantity = 0; // Ensure this is declared outside and accessible
    totalQuantity += productDetails.quantity;

    document.getElementById('total-products').textContent = `Total Products: ${totalQuantity}`;
    document.getElementById('updated-details').textContent = `Updated Details: ${JSON.stringify(productDetails)}`;

    // Update the product details in the backend (placeholder)
    fetch('/api/products/update', { // Placeholder for updating product data
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productDetails)
    })
    .then(response => response.json())
    .then(data => console.log('Product updated successfully:', data))
    .catch(error => console.error('Error updating product:', error));
  });
}

  // Notifications and messaging
  const notificationsDropdown = document.getElementById('notificationDropdown');
  const messagingWindow = document.getElementById('messageDropdown');
  const openMessagingBtn = document.getElementById('open-messaging-btn');
  const messageInput = document.getElementById('message-input');
  const sendMessageBtn = document.getElementById('send-message-btn');
  const messages = document.getElementById('messages');

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    if (notificationsDropdown) {
      notificationsDropdown.appendChild(notification);
    }
  }

  function addMessage(sender, content) {
    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = `<strong>${sender}:</strong> ${content}`;
    if (messages) {
      messages.appendChild(message);
    }
  }

  if (openMessagingBtn && messagingWindow) {
    openMessagingBtn.addEventListener('click', () => {
      messagingWindow.classList.toggle('open');
    });
  }

  if (sendMessageBtn && messageInput) {
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
  }

  setInterval(() => {
    showNotification('New notification received.');
  }, 5000);

  // Sidebar
  const sidebarToggle = document.querySelector(".sidebar-toggler");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.querySelector(".sidebar").classList.toggle("open");
    });
  }

  // Fetch and display cashier-related data
  function fetchCashierData() {
    fetch('/api/cashier/data')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('today-sale').innerText = `$${data.todaySale}`;
        document.getElementById('total-sale').innerText = `$${data.totalSale}`;
        document.getElementById('today-revenue').innerText = `$${data.todayRevenue}`;
        document.getElementById('total-revenue').innerText = `$${data.totalRevenue}`;
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

  fetchCashierData();

  // Profile management
  const profileBtn = document.getElementById('profile');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      // Logic to open the profile modal or page
      // Fetch current profile details and populate the form
      // Allow user to update details
    });
  }

  const settingsBtn = document.getElementById('settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      const currentMode = localStorage.getItem('theme') || 'light';
      if (currentMode === 'light') {
        setDarkMode();
      } else {
        setLightMode();
      }
    });
  }

  const loginLogoutBtn = document.getElementById('login_logout');
  if (loginLogoutBtn) {
    loginLogoutBtn.addEventListener('click', () => {
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
  }

  const toggleThemeButton = document.getElementById('toggleThemeButton');
  const logoutButton = document.getElementById('logoutButton');

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.className = currentTheme;

  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      const newTheme = document.body.className === 'light' ? 'dark' : 'light';
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme);
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('userRole');
      window.location.href = 'login.html';
    });
  }
});