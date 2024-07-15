document.addEventListener('DOMContentLoaded', function() {
  const updateProductForm = document.getElementById('update-product-form');
  
  updateProductForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const productId = document.getElementById('update-product-id').value;
    const productName = document.getElementById('update-product-name').value;
    const productCategory = document.getElementById('update-product-category').value;
    const productSize = document.getElementById('update-product-size').value;
    const productQuantity = document.getElementById('update-product-quantity').value;
    const productPrice = document.getElementById('update-product-price').value;
    const productImage = document.getElementById('update-product-image').files[0];

    if (!validateForm(productName, productCategory, productSize, productQuantity, productPrice)) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('name', productName);
    formData.append('category', productCategory);
    formData.append('size', productSize);
    formData.append('quantity', productQuantity);
    formData.append('price', productPrice);
    formData.append('image', productImage);

    updateProduct(formData)
      .then(response => {
        if (response.success) {
          alert('Product updated successfully!');
          // Redirect to admin dashboard or show success message
          window.location.href = '/admin';
        } else {
          alert('Failed to update product: ' + response.message);
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        alert('An error occurred while updating the product.');
      });
  });

  function validateForm(name, category, size, quantity, price) {
    return name && category && size && !isNaN(quantity) && !isNaN(price);
  }

  function updateProduct(formData) {
    return fetch('/api/products/update', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json());
  }

  function fetchProductDetails(productId) {
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        document.getElementById('update-product-name').value = product.name;
        document.getElementById('update-product-category').value = product.category;
        document.getElementById('update-product-size').value = product.size;
        document.getElementById('update-product-quantity').value = product.quantity;
        document.getElementById('update-product-price').value = product.price;
        // Handle image if needed
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }

  // Fetch product details if editing an existing product
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  if (productId) {
    document.getElementById('update-product-id').value = productId;
    fetchProductDetails(productId);
  }

  // Additional listeners for other functionalities (if any)
  // Example: button to fetch the latest products data
  document.getElementById('refresh-products-btn').addEventListener('click', () => {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        console.log('Products data refreshed:', products);
        // Update the UI with the latest products data
      })
      .catch(error => {
        console.error('Error refreshing products data:', error);
      });
