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

        // Update the product details in the backend (placeholder)
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
    const spinner = document.getElementById("spinner");
    if (spinner) {
        setTimeout(() => {
            spinner.classList.remove("show");
        }, 1000);
    }

    // Sidebar Toggle
    const sidebarToggle = document.querySelector(".sidebar-toggler");
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
});

// admin.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch initial data for admin dashboard
    fetchDashboardData();

    // Event listeners for navigation
    document.querySelector('a[href="addproduct.html"]').addEventListener('click', () => navigateToPage('addproduct.html'));
    document.querySelector('a[href="calculator.html"]').addEventListener('click', () => navigateToPage('calculator.html'));
    document.querySelector('a[href="element.html"]').addEventListener('click', () => navigateToPage('element.html'));
    document.querySelector('a[href="widget.html"]').addEventListener('click', () => navigateToPage('widget.html'));
    document.querySelector('a[href="form.html"]').addEventListener('click', () => navigateToPage('form.html'));
    document.querySelector('a[href="table.html"]').addEventListener('click', () => navigateToPage('table.html'));
    document.querySelector('a[href="chart.html"]').addEventListener('click', () => navigateToPage('chart.html'));
    document.querySelector('a[href="addcashier.html"]').addEventListener('click', () => navigateToPage('addcashier.html'));
    document.querySelector('a[href="marketing.html"]').addEventListener('click', () => navigateToPage('marketing.html'));
    document.querySelector('a[href="blank.html"]').addEventListener('click', () => navigateToPage('blank.html'));
    document.querySelector('a[href="payment.html"]').addEventListener('click', () => navigateToPage('payment.html'));
    document.querySelector('a[href="receipt.html"]').addEventListener('click', () => navigateToPage('receipt.html'));
});

// Fetch initial data for the dashboard
function fetchDashboardData() {
    // Dummy data fetch - Replace with actual server call
    const notificationCount = 5;
    const messageCount = 3;

    updateNotificationCount(notificationCount);
    updateMessageCount(messageCount);
}

document.addEventListener('DOMContentLoaded', function () {
    // Code for initializing the spinner and removing it after content load
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('show');
  
    // Initialize Calendar (Placeholder: replace with actual calendar logic)
    const calendarElement = document.getElementById('calendar');
    calendarElement.textContent = 'Calendar will be here...';
  
    // Populate orders and messages (Placeholder: replace with actual logic)
    const orders = [
      { id: 1, customer: 'John Doe', date: '2024-07-20', amount: '$100', status: 'Completed' },
      { id: 2, customer: 'Jane Smith', date: '2024-07-21', amount: '$150', status: 'Pending' },
    ];
  
    const ordersTableBody = document.querySelector('.table tbody');
    orders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td>${order.amount}</td>
        <td>${order.status}</td>
      `;
      ordersTableBody.appendChild(row);
    });
  
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.textContent = 'No new messages';
  });
