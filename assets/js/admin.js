document.addEventListener('DOMContentLoaded', function() {
    // Elements
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
    const spinner = document.getElementById("spinner");
    const sidebarToggle = document.querySelector(".sidebar-toggler");

    let totalQuantity = 0;

    // Quantity Control
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

    // Update Product
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

        // Update the product details in the backend
        fetch('/api/product/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productDetails),
        })
        .then(response => response.json())
        .then(data => console.log('Product updated:', data))
        .catch(error => console.error('Error updating product:', error));
    });

    // Spinner
    if (spinner) {
        setTimeout(() => {
            spinner.classList.remove("show");
        }, 1000);
    }

    // Sidebar Toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            document.querySelector(".sidebar").classList.toggle("open");
        });
    }

    // Fetch and display admin-related data
    fetchAdminData();

    function fetchAdminData() {
        fetch('/api/admin/data')
            .then(response => response.json())
            .then(data => {
                document.getElementById('today-sale').innerText = `$${data.todaySale}`;
                document.getElementById('total-sale').innerText = `$${data.totalSale}`;
                document.getElementById('today-revenue').innerText = `$${data.todayRevenue}`;
                document.getElementById('total-revenue').innerText = `$${data.totalRevenue}`;
                populateRecentSales(data.recentSales);
            })
            .catch(error => console.error('Error fetching admin data:', error));
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

    // Business Records
    trackBusinessRecords();
    function trackBusinessRecords() {
        fetch('/api/business/records')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching business records:', error));
    }

    // Cashier Performance
    trackCashierPerformance();
    function trackCashierPerformance() {
        fetch('/api/cashier/performance')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching cashier performance:', error));
    }

    // Products
    trackProducts();
    function trackProducts() {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching products:', error));
    }

    // Calculate Gain or Loss
    calculateGainLoss();
    function calculateGainLoss() {
        let gainLoss = calculateFromRecords(); // Example: Use business records to calculate
        console.log('Gain/Loss:', gainLoss);
    }

    // Add Cashier
    function addCashier(cashierData) {
        fetch('/api/cashier/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cashierData),
        })
        .then(response => response.json())
        .then(data => console.log('New cashier added:', data))
        .catch(error => console.error('Error adding cashier:', error));
    }

    // Remove Cashier
    function removeCashier(cashierId) {
        fetch(`/api/cashier/remove/${cashierId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => console.log('Cashier removed:', data))
        .catch(error => console.error('Error removing cashier:', error));
    }

    // Add New Product
    function addNewProduct(productData) {
        fetch('/api/product/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(response => response.json())
        .then(data => console.log('New product added:', data))
        .catch(error => console.error('Error adding product:', error));
    }

    // Update Product Info
    function updateProductInfo(productId, updatedInfo) {
        fetch(`/api/product/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        })
        .then(response => response.json())
        .then(data => console.log('Product updated:', data))
        .catch(error => console.error('Error updating product:', error));
    }

    // Handle Notifications
    handleNotifications();
    function handleNotifications() {
        console.log('Checking notifications...');
    }

    // Fetch initial data for admin dashboard
    fetchDashboardData();

    // Event listeners for navigation
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navigateToPage(event.target.getAttribute('href'));
        });
    });

    function fetchDashboardData() {
        // Dummy data fetch - Replace with actual server call
        const notificationCount = 5;
        const messageCount = 3;

        updateNotificationCount(notificationCount);
        updateMessageCount(messageCount);
    }

    function updateNotificationCount(count) {
        const notificationElement = document.querySelector('.fa-bell span');
        notificationElement.innerText = count;
    }

    function updateMessageCount(count) {
        const messageElement = document.querySelector('.fa-envelope span');
        messageElement.innerText = count;
    }

    function navigateToPage(page) {
        window.location.href = page;
    }
});

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