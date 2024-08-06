
document.addEventListener('DOMContentLoaded', () => {
  const updateProductForm = document.getElementById('update-product-form');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    document.getElementById('update-product-id').value = productId;
    fetchProductDetails(productId);
  }

  updateProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(updateProductForm);

    if (!validateForm(formData)) {
      alert('Please fill out all fields correctly.');
      return;
    }

    updateProduct(formData)
      .then(response => {
        if (response.success) {
          alert('Product updated successfully!');
          notifyUsers();
          window.location.href = '/admin.html';
        } else {
          alert('Failed to update product: ' + response.message);
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        alert('An error occurred while updating the product.');
      });
  });

  function validateForm(formData) {
    return formData.get('update-product-name') &&
           formData.get('update-product-category') &&
           formData.get('update-product-size') &&
           !isNaN(formData.get('update-product-quantity')) &&
           !isNaN(formData.get('update-product-price'));
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

  function notifyUsers() {
    // Notify admin and cashier about the update
    // You can customize this function as needed
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Product updated successfully.' })
    })
    .then(response => response.json())
    .then(data => console.log('Users notified:', data))
    .catch(error => console.error('Error notifying users:', error));
  }
});