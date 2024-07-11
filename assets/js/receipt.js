
document.addEventListener('DOMContentLoaded', function() {
  const printButton = document.getElementById('print-receipt');
  
  printButton.addEventListener('click', function() {
    window.print();
  });

  // Mock receipt data
  const receiptData = [
    {
      name: 'Coca-Cola',
      trackingId: '12345',
      productNumber: '001',
      quantity: 10,
      size: '500ml',
      price: 50
    },
    // Add more products as needed
  ];

  const receiptBody = document.getElementById('receipt-body');
  receiptData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.trackingId}</td>
      <td>${item.productNumber}</td>
      <td>${item.quantity}</td>
      <td>${item.size}</td>
      <td>${item.price}</td>
    `;
    receiptBody.appendChild(row);
  });
});