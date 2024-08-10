document.addEventListener('DOMContentLoaded', function() {
  // Real live products data
  const newProducts = [
    { name: 'viju apple fruit milk', size: '500ml', price: '3,456', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'v Cool orange', size: '50cl', price: '90', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'pepsi Cola', size: '40cl', price: '3700', img: 'papsi.jpeg', rating: 3 },
    { name: 'coke', size: '50cl', price: '3850', img: 'coke.jpeg', rating: 3 },
    { name: 'coke', size: '35cl', price: '2,500', img: 'coke.jpeg', rating: 3 },
    { name: 'v-cool cola', size: '500ml', price: '3700', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'v-cool cofee cola', size: '500ml', price: '3700', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'fanta', size: '50cl', price: '2,850', img: 'fanta.jpeg', rating: 3 },
    { name: 'climax', size: '600ml', price: '5,300', img: 'climax.jpeg', rating: 3 },
    { name: 'Hi-malt can', size: '50cl', price: '5,300', img: 'hi_maltcan.jpeg', rating: 3 },
    { name: 'Bigi Cola', size: '50cl', price: '3,100', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'Bigi -cherry-black', size: '50cl', price: '3,100', img: 'bigi-cola.jpeg', rating: 3 },
    { name: 'hi-malt plastic', size: '50cl', price: '3,700', img: 'hi_maltplastic.jpeg', rating: 3 },
    { name: 'pepsi bottle', size: '50cl', price: '3,700', img: 'pepsi.jpeg', rating: 3 },
    { name: 'predator', size: '50cl', price: '3,500', img: 'predator.jpeg', rating: 3 },
    { name: 'slim', size: '50cl', price: '3,500', img: 'slim.jpeg', rating: 3 },
    { name: 'smoove tropical', size: '50cl', price: '3,500', img: 'smoove_tropical.jpeg', rating: 3 },
    { name: 'smoove chapman', size: '50cl', price: '3,500', img: 'smoove_chapman.jpeg', rating: 3 },
    { name: 'sosa chapman', size: '50cl', price: '3,500', img: 'sosa_chapman.jpeg', rating: 3 },
    { name: 'Bigi -lemon', size: '50cl', price: '3,100', img: 'bigi-lemon.jpeg', rating: 3 },
    { name: '7up', size: '50cl', price: '3,700', img: '7up.jpeg', rating: 3 },
    { name: 'maca', size: '50cl', price: '3,500', img: 'maca.jpeg', rating: 3 },
    { name: 'lucozade', size: '50cl', price: '3,500', img: 'lucozade.jpeg', rating: 3 },
    { name: 'lucozade can', size: '50cl', price: '3,500', img: 'lucozade_can.jpeg', rating: 3 },
    { name: 'lucozade zero tropical', size: '50cl', price: '3,500', img: 'lucozade_zero_tropical.jpeg', rating: 3 },
    { name: 'malta guiness', size: '50cl', price: '0.90', img: 'malta_guiness.jpeg', rating: 3 },
    { name: 'team', size: '50cl', price: '3,700', img: 'team.jpeg', rating: 3 },
    { name: 'lucozade can', size: '50cl', price: '', img: 'lucozade_can.jpeg', rating: 3 },
    { name: 'sosa apple', size: '50cl', price: '', img: 'sosa_apple.jpeg', rating: 3 },
    { name: 'sosa orange', size: '50cl', price: '', img: 'sosa_orange.jpeg', rating: 3 },
    { name: 'sosa mixed berry', size: '50cl', price: '', img: 'sosa_mixed_berry.jpeg', rating: 3 },
    { name: 'sprite', size: '50cl', price: '2,850', img: 'sprite.jpeg', rating: 3 },
    { name: 'Bigi tropical', size: '50cl', price: '3,100', img: 'bigi-tropical.jpeg', rating: 3 },
    { name: 'Bigi chapman', size: '50cl', price: '3,100', img: 'bigi-chapman.jpeg', rating: 3 },
    { name: 'Bigi apple', size: '50cl', price: '3,100', img: 'bigi-apple.jpeg', rating: 3 },
    { name: 'Mr. big water', size: '50cl', price: '', img: 'mr_big_water.jpeg', rating: 3 },
    { name: 'fearless plastic', size: '50cl', price: '3,100', img: 'fearless_plastic.jpeg', rating: 3 },
    { name: 'fearless can', size: '50cl', price: '3,100', img: 'fearless_can.jpeg', rating: 3 },
    { name: 'viju wheat', size: '50cl', price: '9,500', img: 'viju_wheat.jpeg', rating: 3 },
    { name: 'viju chocolate', size: '50cl', price: '9,500', img: 'viju_chocolate.jpeg', rating: 3 },
    { name: 'viju plain yogurt', size: '50cl', price: '9,500', img: 'viju_plain_yogurt.jpeg', rating: 3 },
    { name: 'mr. V water', size: '50cl', price: '', img: 'mr_v_water.jpeg', rating: 3 },
    { name: 'lacasera', size: '50cl', price: '3,700', img: 'lacasera.jpeg', rating: 3 },
    { name: 'lacasera', size: '50cl', price: '3,700', img: 'lacasera.jpeg', rating: 3 },
    { name: 'Zagg', size: '50cl', price: '5,300', img: 'zagg.jpeg', rating: 3 },
    { name: 'schweppes', size: '50cl', price: '3,300', img: 'schweppes.jpeg', rating: 3 },
    { name: 'pulpy', size: '50cl', price: '', img: 'pulpy.jpeg', rating: 3 },
    { name: 'eva water', size: '50cl', price: '', img: 'eva_water.jpeg', rating: 3 },
    { name: 'eva water', size: '50cl', price: '', img: 'eva_water.jpeg', rating: 3 },
    { name: 'komando', size: '50cl', price: '3,700', img: 'komando.jpeg', rating: 3 },
    { name: 'viju baked yogurt', size: '50cl', price: '9,500', img: 'viju_baked_yogurt.jpeg', rating: 3 },
    { name: 'vigor', size: '50cl', price: '9,500', img: 'vigor.jpeg', rating: 3 },
    { name: 'viju pineapple drink', size: '50cl', price: '9,500', img: 'viju_pineapple_drink.jpeg', rating: 3 },
    { name: 'amstel', size: '50cl', price: '9,500', img: 'amstel.jpeg', rating: 3 },
  ];

  const productContainer = document.querySelector('.product-grid');

  newProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    const imagePath = `assets/images/${product.img}`;
    const imgExists = new Image();
    imgExists.src = imagePath;

    imgExists.onload = function() {
      productElement.innerHTML = `
        <img src="${imagePath}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Size: ${product.size}</p>
        <p>Price: N${product.price || 'N/A'}</p>
        <div class="rating">
          ${'<i class="fa fa-star"></i>'.repeat(product.rating)}
        </div>
      `;
    };

    imgExists.onerror = function() {
      productElement.innerHTML = `
        <img src="assets/images/default.jpeg" alt="Default Image">
        <h3>${product.name}</h3>
        <p>Size: ${product.size}</p>
        <p>Price: N${product.price || 'N/A'}</p>
        <div class="rating">
          ${'<i class="fa fa-star"></i>'.repeat(product.rating)}
        </div>
      `;
    };

    productContainer.appendChild(productElement);
  });
});