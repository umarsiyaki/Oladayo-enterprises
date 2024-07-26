
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle for smaller screens
  const sidebarToggler = document.querySelector('.sidebar-toggler');
  if (sidebarToggler) {
    sidebarToggler.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('open');
    });
  }

  // Fetch and display products
  loadProducts();

  function loadProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => displayProducts(products))
      .catch(error => console.error('Error fetching products:', error));
  }

  function displayProducts(products) {
    const productSections = {
      'Energy Drinks': document.querySelector('.row:nth-of-type(1)'),
      'Maltina': document.querySelector('.row:nth-of-type(2)'),
      'Cola': document.querySelector('.row:nth-of-type(3)'),
      'Tropical': document.querySelector('.row:nth-of-type(4)'),
      'Fanta': document.querySelector('.row:nth-of-type(5)')
    };

    products.forEach(product => {
      const productCard = createProductCard(product);
      if (productSections[product.category]) {
        productSections[product.category].appendChild(productCard);
      }
    });
  }

  function createProductCard(product) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-lg-3 col-md-6 mb-4';

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = product.image;
    img.alt = product.name;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = product.name;

    const cardText1 = document.createElement('p');
    cardText1.className = 'card-text';
    cardText1.textContent = product.description;

    const cardText2 = document.createElement('p');
    cardText2.className = 'card-text';
    cardText2.innerHTML = `<strong>Price: $${product.price}</strong>`;

    const addButton = document.createElement('button');
    addButton.className = 'btn btn-primary';
    addButton.textContent = 'Add to Cart';
    addButton.onclick = () => addToCart(product.id);

    cardBody.append(cardTitle, cardText1, cardText2, addButton);
    card.append(img, cardBody);
    cardDiv.appendChild(card);

    return cardDiv;
  }

  function addToCart(productId) {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    })
      .then(response => response.json())
      .then(result => alert(result.message))
      .catch(error => console.error('Error adding to cart:', error));
  }

  // Setup search functionality
  const searchInput = document.querySelector('.form-control');
  if (searchInput) {
    searchInput.addEventListener('input', async (event) => {
      const query = event.target.value;
      try {
        const response = await fetch(`/api/products/search?q=${query}`);
        const products = await response.json();
        displayProducts(products);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    });
  }
});