
document.getElementById('add-cashier-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const cashierName = document.getElementById('cashier-name').value;
  const cashierEmail = document.getElementById('cashier-email').value;
  const cashierPassword = document.getElementById('cashier-password').value;
  
  // Perform form validation and submission logic here
  
  console.log('Cashier added:', {
    cashierName,
    cashierEmail,
    cashierPassword
  });
  
  // Redirect to admin dashboard or show success message
});