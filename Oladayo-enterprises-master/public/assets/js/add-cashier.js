
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


document.getElementById('add-cashier-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const cashierData = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      password: document.getElementById('password').value
  };

  fetch('/api/cashier/add', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cashierData),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          document.getElementById('notification').textContent = 'Cashier added successfully.';
          sendEmailNotification(cashierData);
      } else {
          document.getElementById('notification').textContent = 'Error adding cashier.';
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('notification').textContent = 'Error adding cashier.';
  });

  function sendEmailNotification(cashierData) {
      fetch('/api/send-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              to: cashierData.email,
              subject: 'Welcome to Our Team',
              body: `Hello ${cashierData.username}, your account has been created. Your login details are Username: ${cashierData.username} and Password: ${cashierData.password}`
          }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              console.log('Email sent successfully.');
          } else {
              console.error('Error sending email.');
          }
      })
      .catch(error => console.error('Error:', error));
  }
});