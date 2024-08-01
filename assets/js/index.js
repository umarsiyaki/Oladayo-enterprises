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

  renderProducts('#new-products .product-grid', newProducts);
  renderProducts('#trending-products .product-grid', trendingProducts);

  document.getElementById('contact-us-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us!');
  });
});

//index.js`
document.addEventListener('DOMContentLoaded', function () {
  // Handle dynamic loading of product slideshow
  fetch('/api/products/slideshow')
    .then(response => response.json())
    .then(data => {
      const carouselInner = document.querySelector('#carouselExampleIndicators .carousel-inner');
      data.products.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item${index === 0 ? ' active' : ''}`;
        item.innerHTML = `
          <img src="${product.image}" class="d-block w-100" alt="${product.name}">
          <div class="carousel-caption d-none d-md-block">
            <h5>${product.name}</h5>
            <p>${product.description}</p>
          </div>
        `;
        carouselInner.appendChild(item);
      });
    });

  // Handle dynamic loading of blog posts
  fetch('/api/blogs')
    .then(response => response.json())
    .then(data => {
      const blogRow = document.querySelector('#blogs .row');
      data.blogs.forEach(blog => {
        const blogPost = document.createElement('div');
        blogPost.className = 'col-lg-4 col-md-6 mb-4';
        blogPost.innerHTML = `
          <div class="card">
            <img src="${blog.image}" class="card-img-top" alt="${blog.title}">
            <div class="card-body">
              <h5 class="card-title">${blog.title}</h5>
              <p class="card-text">${blog.summary}</p>
              <a href="/blog/${blog.id}" class="btn btn-primary">Read More</a>
            </div>
          </div>
        `;
        blogRow.appendChild(blogPost);
      });
    });

  // Handle dynamic loading of team members
  fetch('/api/team')
    .then(response => response.json())
    .then(data => {
      const teamRow = document.querySelector('#team .row');
      data.team.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.className = 'col-lg-4 col-md-6 mb-4';
        teamMember.innerHTML = `
          <div class="card">
            <img src="${member.image}" class="card-img-top" alt="${member.name}">
            <div class="card-body">
              <h5 class="card-title">${member.name}</h5>
              <p class="card-text">${member.position}</p>
            </div>
          </div>
        `;
        teamRow.appendChild(teamMember);
      });
    });

  // Handle form submission for contact us
  const contactForm = document.getElementById('contact-us-form');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        alert('Failed to send message. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to send message. Please try again later.');
    });
  });

  // Handle user-specific navbar changes
  fetch('/api/user-info')
    .then(response => response.json())
    .then(data => {
      const navbar = document.querySelector('.navbar-nav.ms-auto');
      navbar.innerHTML = '';
      if (data.isLoggedIn) {
        navbar.innerHTML = `
          <li class="nav-item"><a class="nav-link" href="/profile">${data.username}</a></li>
          <li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>
        `;
        if (data.role === 'admin') {
          const adminNav = document.querySelector('.navbar-nav.me-auto');
          adminNav.innerHTML += '<li class="nav-item"><a class="nav-link" href="/admin">Admin Panel</a></li>';
        }
      } else {
        navbar.innerHTML = `
          <li class="nav-item"><a class="nav-link" href="/login">Login/Register</a></li>
        `;
      }
    });
});