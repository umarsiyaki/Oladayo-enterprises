document.addEventListener('DOMContentLoaded', function() {
  // Example products data
  const newProducts = [
    { name: 'Coca-Cola', size: '50cl', price: '1.00', img: 'coke.jpg', rating: 4 },
    { name: 'Fanta', size: '50cl', price: '1.00', img: 'fanta.jpg', rating: 5 },
    // Add more products as needed
  ];

  const trendingProducts = [
    { name: 'Bigi Cola', size: '50cl', price: '0.90', img: 'bigi-cola.jpg', rating: 3 },
    { name: 'Pepsi', size: '50cl', price: '1.10', img: 'pepsi.jpg', rating: 4 },
    // Add more products as needed
  ];

  function renderProducts(containerId, products) {
    const container = document.querySelector(containerId);
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
        <img src="assets/images/${product.img}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h5>${product.name}</h5>
          <p>Size: ${product.size}</p>
          <p>Price: $${product.price}</p>
          <p>Rating: ${'★'.repeat(product.rating)}</p>
        </div>
      `;
      container.appendChild(productItem);
    });
  }

  renderProducts('#new-products', newProducts);
  renderProducts('#trending-products', trendingProducts);

  // Contact form submission handling
  document.getElementById('contact-us-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your message has been sent successfully!');
  });
});