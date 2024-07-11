
document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.getElementById('confirm-payment');
  const cancelButton = document.getElementById('cancel-payment');
  
  confirmButton.addEventListener('click', function() {
    // Mock payment process
    setTimeout(() => {
      alert('Payment confirmed. Notifying admin and cashier...');
      // Redirect to receipt page
      window.location.href = '/receipt';
    }, 2000);
  });

  cancelButton.addEventListener('click', function() {
    // Cancel payment logic
    alert('Payment cancelled.');
  });
});