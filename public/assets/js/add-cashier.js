
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-cashier-form');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather form data
        const cashierData = {
            role: 'cashier',  // Predefined as 'cashier'
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            password: document.getElementById('password').value,
            firstname: document.getElementById('firstname').value,
            middlename: document.getElementById('middlename').value,
            surname: document.getElementById('surname').value
        };

        // Validate input fields
        const validationMessage = validateForm(cashierData);
        if (validationMessage) {
            notifyUser(notification, validationMessage, 'error');
            return;
        }

        // Submit cashier data to the server
        fetch('/api/user/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cashierData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                notifyUser(notification, 'Cashier added successfully.', 'success');

                // Send email notification
                sendEmailNotification(cashierData);

                // Optionally reset the form
                form.reset();

                // Redirect to cashier dashboard or desired page
                setTimeout(() => {
                    window.location.href = '/cashier/dashboard';
                }, 1500);
            } else {
                notifyUser(notification, 'Error adding cashier.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            notifyUser(notification, 'Error adding cashier.', 'error');
        });
    });

    // Function to validate form data
    function validateForm(cashierData) {
        // Check for empty required fields
        if (!cashierData.username || !cashierData.email || !cashierData.password) {
            return 'Please fill out all required fields.';
        }

        // Validate email format using a regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(cashierData.email)) {
            return 'Please enter a valid email address.';
        }

        // Validate password strength (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(cashierData.password)) {
            return 'Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character.';
        }

        // All validations passed
        return null;
    }

    // Function to send an email notification to the new cashier
    function sendEmailNotification(cashierData) {
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: cashierData.email,
                subject: 'Welcome to Our Team',
                body: `Hello ${cashierData.firstname} ${cashierData.surname},\n\nYour account has been created. Your login details are:\n\nUsername: ${cashierData.username}\nPassword: ${cashierData.password}\n\nWelcome aboard!`
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

    // Function to notify the user
    function notifyUser(notificationElement, message, type) {
        notificationElement.textContent = message;
        notificationElement.className = type;
        notificationElement.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    }

    // Futuristic Feature: Real-time Username Availability Check
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value;

        if (username.length > 3) {
            fetch(`/api/user/check-username?username=${encodeURIComponent(username)}`)
            .then(response => response.json())
            .then(data => {
                if (!data.available) {
                    notifyUser(notification, 'Username is already taken.', 'error');
                } else {
                    notification.textContent = '';
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});