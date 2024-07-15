document.addEventListener('DOMContentLoaded', function() {
  const receiptModal = document.getElementById('receipt-modal');
  const receiptContent = document.getElementById('receipt-content');
  const closeReceiptBtn = document.getElementById('close-receipt-btn');

  // Function to populate and display the receipt modal
  function showReceipt(orderDetails) {
    receiptContent.innerHTML = `
      <p><strong>Order ID:</strong> ${orderDetails.id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Customer:</strong> ${orderDetails.username}</p>
      <h3>Products</h3>
      <ul>
        ${orderDetails.products.map(product => `
          <li>${product.name} - ${product.quantity} x $${product.price} = $${product.quantity * product.price}</li>
        `).join('')}
      </ul>
      <p><strong>Total:</strong> $${orderDetails.total}</p>
    `;
    
    receiptModal.style.display = 'block';
  }

  // Close the receipt modal
  closeReceiptBtn.addEventListener('click', function() {
    receiptModal.style.display = 'none';
  });

  // Close the modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target == receiptModal) {
      receiptModal.style.display = 'none';
    }
  });

  // Simulate an order completion event for demonstration purposes
  // In a real application, this function should be called when an order is completed
  function completeOrderDemo() {
    const orderDetails = {
      id: '12345',
      username: 'john_doe',
      products: [
        { name: 'Product 1', quantity: 2, price: 10 },
        { name: 'Product 2', quantity: 1, price: 20 }
      ],
      total: 40
    };
    showReceipt(orderDetails);
  }

  // Uncomment this line to test the receipt display
   completeOrderDemo();
});
