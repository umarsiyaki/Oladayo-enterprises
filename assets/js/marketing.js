
document.addEventListener('DOMContentLoaded', function () {
  const products = [
    { name: 'Coca-Cola', size: '50cl', price: '1.00', img: 'coke.jpg', rating: 4, vendor: 'coca-cola' },
    { name: 'Bigi Cola', size: '50cl', price: '0.90', img: 'bigi-cola.jpg', rating: 3, vendor: 'bigi' },
    // Add more products as needed
  ];

  function renderProducts(products) {
    const container = document.querySelector('#product-list .product-grid');
    container.innerHTML = '';
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
        <img src="assets/images/${product.img}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h4>${product.name}</h4>
          <p>Size: ${product.size}</p>
          <p>Price: $${product.price}</p>
          <div class="rating">
            ${'<img src="assets/images/star-filled.png" alt="Star">'.repeat(product.rating)}
            ${'<img src="assets/images/star-empty.png" alt="Star">'.repeat(5 - product.rating)}
          </div>
          <button type="button" class="add-to-cart-btn">Add to Cart</button>
        </div>
      `;
      container.appendChild(productItem);
    });
  }

  renderProducts(products);

  document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const size = document.getElementById('size').value.toLowerCase();
    const priceRange = document.getElementById('price-range').value.split('-').map(Number);
    
    const filteredProducts = products.filter(product => {
      const matchesCategory = category === 'all' || product.vendor === category;
      const matchesSize = !size || product.size.toLowerCase().includes(size);
      const matchesPrice = !priceRange[0] || (product.price >= priceRange[0] && product.price <= priceRange[1]);
      return matchesCategory && matchesSize && matchesPrice;
    });

    renderProducts(filteredProducts);
  });
});