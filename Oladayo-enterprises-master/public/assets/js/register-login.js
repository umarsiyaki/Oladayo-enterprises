document.addEventListener('DOMContentLoaded', function() {
  // Registration form submission
  document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Perform validation
    const passwordStrength = checkPasswordStrength(data.password);
    if (passwordStrength === 'weak') {
      alert('Password is too weak. Please use a stronger password.');
      return;
    }

    if (validateForm(data)) {
      // Send data to the server
      fetch('https://oladay.com.ng/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert('Registration successful! Please verify your email.');
          // Optionally, redirect to another page
          window.location.href = '/verify-email.html';
        } else {
          alert('Registration failed: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Registration failed due to a network error.');
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  });

  // Login form submission
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (validateLogin(data)) {
      fetch('https://oladay.com.ng/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert('Login successful!');
          localStorage.setItem('user', JSON.stringify(result.user));
          window.location.href = '/dashboard.html';
        } else {
          alert('Login failed: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Login failed due to a network error.');
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  });

  // Password recovery form submission
  document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (validateEmail(data.email)) {
      fetch('https://oladay.com.ng/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert('Password recovery instructions have been sent!');
        } else {
          alert('Password recovery failed: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Password recovery failed due to a network error.');
      });
    } else {
      alert('Please enter a valid email address.');
    }
  });
});

function validateForm(data) {
  return data.username && data.email && data.password && data.confirmPassword && (data.password === data.confirmPassword) && /^[a-zA-Z0-9]+$/.test(data.password);
}

function validateLogin(data) {
  return data.email && data.password;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function checkPasswordStrength(password) {
  let strength = 'weak';
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  const mediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

  if (strongPassword.test(password)) {
    strength = 'strong';
  } else if (mediumPassword.test(password)) {
    strength = 'medium';
  }

  return strength;
}
