
// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/oladayo_ventures', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  size: String,
  quantity: Number,
  price: Number,
  image: String,
  approved: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

// API routes

// Get all approved products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ approved: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add a new product (cashier or admin)
app.post('/api/products', async (req, res) => {
  const { name, category, size, quantity, price, image } = req.body;
  const product = new Product({ name, category, size, quantity, price, image, approved: false });
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Approve or reject a product (admin only)
app.patch('/api/products/:id', async (req, res) => {
  const { approved } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.approved = approved;
    if (!approved) {
      await product.remove();
      return res.json({ message: 'Product rejected and removed' });
    }
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Serve the market.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'market.html'));
});

// Frontend code to be included in the market.html file
app.get('/assets/js/marketing.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets', 'js', 'marketing.js'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Public directory structure
// public/
// ├── assets/
// │   ├── css/
// │   │   └── styles.css
// │   ├── images/
// │   │   └── various images
// │   └── js/
// │       └── marketing.js
// └── market.html

// In marketing.js (frontend code)

document.addEventListener('DOMContentLoaded', function() {
  const productGrid = document.querySelector('.product-grid');
  const searchForm = document.getElementById('search-form');

  // Function to fetch and display products
  function fetchProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        productGrid.innerHTML = '';
        data.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Size: ${product.size}</p>
            <p>Price: $${product.price}</p>
          `;
          productGrid.appendChild(productCard);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  // Event listener for search form submission
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const size = document.getElementById('size').value;
    const priceRange = document.getElementById('price-range').value;

    fetch(`/api/products?category=${category}&size=${size}&priceRange=${priceRange}`)
      .then(response => response.json())
      .then(data => {
        productGrid.innerHTML = '';
        data.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Size: ${product.size}</p>
            <p>Price: $${product.price}</p>
          `;
          productGrid.appendChild(productCard);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  });

  // Initial fetch to display products
  fetchProducts();
});


document.addEventListener("DOMContentLoaded", () => {
  // Sidebar
  const sidebarToggle = document.querySelector(".sidebar-toggler");
  if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
          document.querySelector(".sidebar").classList.toggle("open");
      });
  }

  // Fetch and display marketing-related data
  fetchMarketingData();

  function fetchMarketingData() {
      // Example fetch for marketing data
      fetch('/api/marketing/data')
          .then(response => response.json())
          .then(data => {
              // Populate the page with data
              document.getElementById('today-campaigns').innerText = `$${data.todayCampaigns}`;
              document.getElementById('total-campaigns').innerText = `$${data.totalCampaigns}`;
              document.getElementById('today-reach').innerText = `$${data.todayReach}`;
              document.getElementById('total-reach').innerText = `$${data.totalReach}`;
              // Populate recent campaigns
              populateRecentCampaigns(data.recentCampaigns);
          })
          .catch(error => console.error('Error fetching marketing data:', error));
  }

  function populateRecentCampaigns(campaigns) {
      const campaignsTableBody = document.querySelector("#recent-campaigns tbody");
      campaignsTableBody.innerHTML = "";
      campaigns.forEach(campaign => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${campaign.date}</td>
              <td>${campaign.name}</td>
              <td>${campaign.reach}</td>
              <td>${campaign.status}</td>
              <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          campaignsTableBody.appendChild(row);
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

  // Fetch and display marketing-related data
  fetchMarketingData();

  function fetchMarketingData() {
      // Example fetch for marketing data
      fetch('/api/marketing/data')
          .then(response => response.json())
          .then(data => {
              // Populate the page with data
              document.getElementById('today-campaigns').innerText = `$${data.todayCampaigns}`;
              document.getElementById('total-campaigns').innerText = `$${data.totalCampaigns}`;
              document.getElementById('today-reach').innerText = `$${data.todayReach}`;
              document.getElementById('total-reach').innerText = `$${data.totalReach}`;
              // Populate recent campaigns
              populateRecentCampaigns(data.recentCampaigns);
          })
          .catch(error => console.error('Error fetching marketing data:', error));
  }

  function populateRecentCampaigns(campaigns) {
      const campaignsTableBody = document.querySelector("#recent-campaigns tbody");
      campaignsTableBody.innerHTML = "";
      campaigns.forEach(campaign => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td><input class="form-check-input" type="checkbox"></td>
              <td>${campaign.date}</td>
              <td>${campaign.name}</td>
              <td>${campaign.reach}</td>
              <td>${campaign.status}</td>
              <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
          `;
          campaignsTableBody.appendChild(row);
      });
  }
});