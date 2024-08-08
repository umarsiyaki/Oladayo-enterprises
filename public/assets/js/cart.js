document.addEventListener('DOMContentLoaded', function() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');

  function updateCart() {
    cartList.innerHTML = '';
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.quantity} x ${item.price}`;
      cartList.appendChild(li);
    });
  }

  updateCart();

  checkoutBtn.addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = '/payment';
  });

  // Example of adding an item to the cart (this would be dynamic in your app)
  function addToCart(product) {
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
  }

  // Example product to add to cart
  addToCart({ name: 'Coca-Cola', quantity: 1, price: 1.5 });
});
// Order completion logic
function completeOrder(orderDetails) {
  // Notify admin and cashier
  const notificationMessage = `New order from ${orderDetails.username}. Order ID: ${orderDetails.id}`;
  socket.emit('send notification', notificationMessage);

  // Show the receipt
  showReceipt(orderDetails);
}

