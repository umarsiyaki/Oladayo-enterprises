
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('calculator-form');
  const category = document.getElementById('category');
  const size = document.getElementById('size');
  const productName = document.getElementById('product-name');
  const quantity = document.getElementById('quantity');
  const price = document.getElementById('price');
  const totalAmount = document.getElementById('total-amount');
  const numberPerProduct = document.getElementById('number-per-product');

  // Fetch categories and sizes
  fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
          populateSelect(category, data.categories);
      });

  fetch('/api/sizes')
      .then(response => response.json())
      .then(data => {
          populateSelect(size, data.sizes);
      });

  function populateSelect(selectElement, items) {
      selectElement.innerHTML = items.map(item => `<option value="${item}">${item}</option>`).join('');
  }

  // Calculate total amount
  document.getElementById('calculate-btn').addEventListener('click', () => {
      const qty = parseInt(quantity.value) || 0;
      const prc = parseFloat(price.value) || 0;
      totalAmount.innerText = (qty * prc).toFixed(2);
      numberPerProduct.innerText = qty;
  });

  // Quantity controls
  document.getElementById('count-add-btn').addEventListener('click', () => {
      quantity.value = parseInt(quantity.value) + 1;
      document.getElementById('calculate-btn').click();
  });

  document.getElementById('count-subtract-btn').addEventListener('click', () => {
      if (parseInt(quantity.value) > 1) {
          quantity.value = parseInt(quantity.value) - 1;
      }
      document.getElementById('calculate-btn').click();
  });

  document.getElementById('count-multiply-btn').addEventListener('click', () => {
      quantity.value = parseInt(quantity.value) * 2;
      document.getElementById('calculate-btn').click();
  });

  document.getElementById('count-divide-btn').addEventListener('click', () => {
      quantity.value = Math.max(1, parseInt(quantity.value) / 2);
      document.getElementById('calculate-btn').click();
  });

  // Handle form submission
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      const productDetails = {
          name: productName.value,
          category: category.value,
          size: size.value,
          quantity: parseInt(quantity.value),
          price: parseFloat(price.value),
          totalAmount: parseFloat(totalAmount.innerText)
      };

      fetch('/api/products', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(productDetails)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Product added:', data);
          // Redirect or show success message
      })
      .catch(error => console.error('Error adding product:', error));
  });
});