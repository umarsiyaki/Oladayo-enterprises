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

    totalQuantity += productDetails.quantity;

    totalProducts.textContent = `Total Products: ${totalQuantity}`;
    updatedDetails.textContent = `Updated Details: ${JSON.stringify(productDetails)}`;

    // Update the product details in the backend (placeholder)
    // Use fetch or another method to send the data to the server
  });
});


//counting product

