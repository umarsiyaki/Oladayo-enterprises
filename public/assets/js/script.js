document.addEventListener('DOMContentLoaded', () => {
  const addProductForm = document.getElementById('addProductForm');
  const profileModal = document.getElementById('profile-modal');
  const toggleThemeButton = document.getElementById('toggleThemeButton');
  const logoutButton = document.getElementById('logoutButton');
  const sidebarToggle = document.querySelector('.sidebar-toggler');

  // Add Product Form Submission
  if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const vendorCategory = document.getElementById('vendorCategory').value;
      const brandCategory = document.getElementById('brandCategory').value;
      const productSize = document.getElementById('productSize').value;
      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
      const image = document.querySelector('input[type="file"]').files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const newProduct = {
          id: Date.now(),
          vendorCategory,
          brandCategory,
          productSize,
          productName,
          productPrice,
          image: reader.result
        };

        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push(newProduct);
        localStorage.setItem('inventory', JSON.stringify(inventory));

        alert('Product added successfully');
        addProductForm.reset();
        window.location.href = 'admin.html';
      };

      if (image) {
        reader.readAsDataURL(image);
      } else {
        reader.onloadend();
      }
    });
  }

  // Sidebar Toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('open');
    });
  }

  // Fetch and Display User Data
  const fetchUserData = () => {
    fetch('/api/user/data')
      .then(response => response.json())
      .then(data => {
        document.getElementById('today-purchase').innerText = `$${data.todayPurchase}`;
        document.getElementById('total-purchase').innerText = `$${data.totalPurchase}`;
        document.getElementById('today-spent').innerText = `$${data.todaySpent}`;
        document.getElementById('total-spent').innerText = `$${data.totalSpent}`;
        populateRecentPurchases(data.recentPurchases);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const populateRecentPurchases = (purchases) => {
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
  };

  fetchUserData();

  // Profile Management
  document.getElementById('profile').addEventListener('click', () => {
    profileModal.style.display = 'block';
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => {
        document.getElementById('profile-username').value = data.username;
        document.getElementById('profile-email').value = data.email;
        document.getElementById('profile-phone').value = data.phone;
      })
      .catch(error => console.error('Error fetching profile:', error));

    document.getElementById('profile-update-btn').addEventListener('click', () => {
      const updatedProfile = {
        username: document.getElementById('profile-username').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value,
      };

      fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
      })
      .then(response => response.json())
      .then(data => {
        alert('Profile updated successfully!');
        profileModal.style.display = 'none';
      })
      .catch(error => console.error('Error updating profile:', error));
    });
  });

  // Toggle Theme
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      const newTheme = document.body.className === 'light' ? 'dark' : 'light';
      document.body.className = newTheme;
      local

Storage.setItem('theme', newTheme);
    });

    const storedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = storedTheme;
  }

  // Logout
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      fetch('/api/logout')
        .then(() => {
          window.location.href = '/login.html';
        })
        .catch(error => console.error('Error logging out:', error));
    });
  }
});