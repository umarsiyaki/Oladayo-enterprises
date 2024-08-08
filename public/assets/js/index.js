
document.addEventListener('DOMContentLoaded', function() {
  // Real live products data
  const newProducts = [
    { name: 'viju apple fruit milk', size: '500ml', price: '3,456', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'v Cool orange', size: '50cl', price: '90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'pepsi Cola', size: '40cl', price: '0.90', img: 'papsi.jpeg', rating: 3 },
    { name: 'coke', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'coke', size: '35cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'v-cool cola', size: '500ml', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'v-cool cofee cola', size: '500ml', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'fanta', size: '50cl', price: '0.90', img: 'fanta.jpeg', rating: 3 },
    { name: 'climax', size: '600ml', price: '0.90', img: 'climax.jpeg', rating: 3 },
    { name: 'Hi-malt can', size: '50cl', price: '0.90', img: 'hi_matcan.jpeg', rating: 3 },
    { name: 'Bigi Cola', size: '50cl', price: '0.90', img: '.jpeg', rating: 3 },
    { name: 'Bigi -cherry-black', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'hi-malt plastic', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'pesi buttle', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'predator', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'slim', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'smoove tropical', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'smoove chapman', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'sosa chapman', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi -lemon', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: '7up', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'maca', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'lucozade', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'lucozade can', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'lucozade zero tropical', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'malta guiness', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'team', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'lucozade can', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'sosa apple', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'sosa orange', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'sosa mixed berry', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'sprite', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi tropical', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi chapman', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi apple', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Mr. big water', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'fearless plastic', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'fearless can', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju wheat', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju chocolate', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju plain youghort', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'mr. V water', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'lacasera', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'lacasera', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Zagg', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'schweps', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'pulpy', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'eva water', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'eva water', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'komando', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju baked youghort', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'vigor', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju pineapple drink', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'V-SMARTIC', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'V-JOY', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'MR.BEANS soya milk', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju BB star', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi Cola', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Pepsi', size: '50cl', price: '1.10', img: 'pepsi.jpeg', rating: 4 },
   
    { name: 'Coca-Cola', size: '50cl', price: '1.00', img: 'coke.jpeg', rating: 4 },
    { name: 'Fanta', size: '50cl', price: '1.00', img: 'fanta.jpeg', rating: 5 },
    
    // Add more products as needed
  ];

  const trendingProducts = [
    { name: 'Bigi Cola', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Pepsi', size: '50cl', price: '1.10', img: 'pepsi.jpeg', rating: 4 },
    
    { name: 'eva water', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'eva water', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'komando', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju baked youghort', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'vigor', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju pineapple drink', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'V-SMARTIC', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'V-JOY', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'MR.BEANS soya milk', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'viju BB star', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi Cola', size: '50cl', price: '0.90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Pepsi', size: '50cl', price: '1.10', img: 'pepsi.jpeg', rating: 4 },
    // Add more products as needed
  ];

  // Function to render products in a specified container
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

  // Render new and trending products
  renderProducts('#new-products', newProducts);
  renderProducts('#trending-products', trendingProducts);

  // Contact form submission handling
  document.getElementById('contact-us-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your message has been sent successfully!');
  });
});