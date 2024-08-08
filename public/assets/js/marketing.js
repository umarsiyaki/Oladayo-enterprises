
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

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('productList');

  // Fetch inventory from localStorage (or server in real implementation)
  let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

  inventory.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <h3>${product.productName}</h3>
      <p>Vendor: ${product.vendorCategory}</p>
      <p>Brand: ${product.brandCategory}</p>
      <p>Size: ${product.productSize}</p>
      <p>Price: $${product.productPrice}</p>
    `;
    productList.appendChild(productItem);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const categories = {
    'Energy Drinks': 'energyDrinks',
    'Maltina': 'maltinaDrinks',
    'Cola': 'colaDrinks',
    'Tropical': 'tropicalDrinks',
    'Fanta': 'fantaDrinks'
  };

  // Fetch inventory from localStorage (or server in real implementation)
  let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

  inventory.forEach(product => {
    if (categories[product.vendorCategory]) {
      const productList = document.getElementById(categories[product.vendorCategory]);
      const productCard = createProductCard(product);
      productList.appendChild(productCard);
    }
  });

  function createProductCard(product) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-3 col-md-6 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const img = document.createElement('img');
    img.src = product.image || '../images/coke.jpeg'; // Use a default image if product.image is not provided
    img.className = 'card-img-top';
    img.alt = product.productName;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = product.productName;

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = product.description || 'No description available.'; // Use a default description if not provided

    const price = document.createElement('p');
    price.className = 'card-text';
    price.innerHTML = `<strong>Price: $${product.productPrice}</strong>`;

    const addToCartButton = document.createElement('a');
    addToCartButton.href = '#';
    addToCartButton.className = 'btn btn-primary';
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    });

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(price);
    cardBody.appendChild(addToCartButton);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.productName} has been added to your cart.`);
  }
});