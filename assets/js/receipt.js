document.addEventListener('DOMContentLoaded', function() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const receiptList = document.getElementById('receipt-items');
  const printReceiptBtn = document.getElementById('print-receipt-btn');

  function updateReceipt() {
    receiptList.innerHTML = '';
    cartItems.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.trackingId || 'N/A'}</td>
        <td>${item.productNumber || 'N/A'}</td>
        <td>${item.quantity}</td>
        <td>${item.size || 'N/A'}</td>
        <td>${item.price}</td>
      `;
      receiptList.appendChild(tr);
    });
  }

  updateReceipt();

  printReceiptBtn.addEventListener('click', () => {
    window.print();
  });
});