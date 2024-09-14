
document.addEventListener('DOMContentLoaded', function() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
  const cancelPaymentBtn = document.getElementById('cancel-payment-btn');

  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.quantity} x ${item.price}`;
      cartList.appendChild(li);
      total += item.quantity * item.price;
    });
    totalAmount.value = total.toFixed(2);
  }

  updateCart();

  confirmPaymentBtn.addEventListener('click', () => {
    // Notify admin and cashier
    alert('Payment confirmed. Notifying admin and cashier...');
    localStorage.removeItem('cartItems');
    window.location.href = '/receipt';
  });

  cancelPaymentBtn.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    window.location.href = '/market';
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const productName = document.getElementById('product-name');
  const category = document.getElementById('category');
  const size = document.getElementById('size');
  const type = document.getElementById('type');
  const price = document.getElementById('price');
  const quantity = document.getElementById('quantity');
  const paymentMode = document.getElementById('payment-mode');
  const productId = document.getElementById('product-id');
  const totalAmount = document.getElementById('total-amount');
  const addToCartButton = document.getElementById('add-to-cart');
  const cancelPaymentButton = document.getElementById('cancel-payment');
  const confirmPaymentButton = document.getElementById('confirm-payment');
  const cartDetails = document.getElementById('cart-details');

  let cart = [];

  addToCartButton.addEventListener('click', () => {
    const productDetails = {
      name: productName.value,
      category: category.value,
      size: size.value,
      type: type.value,
      price: parseFloat(price.value),
      quantity: parseInt(quantity.value)
    };

    cart.push(productDetails);
    updateCartDetails();
    updateTotalAmount();
  });

  confirmPaymentButton.addEventListener('click', () => {
    // Notify admin and cashier about the payment
    notifyAdminAndCashier(cart, paymentMode.value);

    // Simulate payment confirmation
    setTimeout(() => {
      alert('Payment confirmed. Redirecting to receipt...');
      window.location.href = 'receipt.html';
    }, 2000);
  });

  cancelPaymentButton.addEventListener('click', () => {
    // Handle payment cancellation
    alert('Payment cancelled.');
    cart = [];
    updateCartDetails();
    updateTotalAmount();
  });

  function updateCartDetails() {
    cartDetails.textContent = `Cart Details: ${cart.length} items`;
  }

  function updateTotalAmount() {
    let total = 0;
    cart.forEach(product => {
      total += product.price * product.quantity;
    });
    totalAmount.value = total.toFixed(2);
  }

  function notifyAdminAndCashier(cart, paymentMode) {
    const notification = {
      cart,
      paymentMode,
      timestamp: new Date().toISOString()
    };

    console.log('Notification sent to admin and cashier:', notification);
    // Use fetch or another method to send the data to the server
  }
});
// Order completion logic
function completeOrder(orderDetails) {
  // Notify admin and cashier
  const notificationMessage = `New order from ${orderDetails.username}. Order ID: ${orderDetails.id}`;
  socket.emit('send notification', notificationMessage);

  // Show the receipt
  showReceipt(orderDetails);
}
