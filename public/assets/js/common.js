// common.js

// Function to update the notification count
function updateNotificationCount(count) {
    document.querySelector('.fa-bell').nextElementSibling.innerText = `Notification (${count})`;
}

// Function to update the message count
function updateMessageCount(count) {
    document.querySelector('.fa-envelope').nextElementSibling.innerText = `Message (${count})`;
}

// Function to navigate to a page
function navigateToPage(page) {
    window.location.href = page;
}

// Function to fetch and display notifications
function fetchNotifications() {
    // Fetch notifications from server (dummy data for now)
    const notifications = [
        { id: 1, text: 'Profile updated', time: '15 minutes ago' },
        { id: 2, text: 'New user added', time: '15 minutes ago' },
        { id: 3, text: 'Password changed', time: '15 minutes ago' },
    ];

    const notificationList = document.querySelector('.dropdown-menu-end');
    notificationList.innerHTML = '';
    notifications.forEach(notification => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'dropdown-item';
        item.innerHTML = `<h6 class="fw-normal mb-0">${notification.text}</h6><small>${notification.time}</small>`;
        notificationList.appendChild(item);
        notificationList.innerHTML += '<hr class="dropdown-divider">';
    });
    notificationList.innerHTML += '<a href="#" class="dropdown-item text-center">See all notifications</a>';
}

// Function to fetch and display messages
function fetchMessages() {
    // Fetch messages from server (dummy data for now)
    const messages = [
        { id: 1, text: 'You have a new message', time: '10 minutes ago' },
        { id: 2, text: 'Your order is ready', time: '20 minutes ago' },
    ];

    const messageList = document.querySelector('.fa-envelope').parentElement.querySelector('.dropdown-menu');
    messageList.innerHTML = '';
    messages.forEach(message => {
        const item = document.createElement('a');
        item.href = '#';
        item.className = 'dropdown-item';
        item.innerHTML = `<h6 class="fw-normal mb-0">${message.text}</h6><small>${message.time}</small>`;
        messageList.appendChild(item);
        messageList.innerHTML += '<hr class="dropdown-divider">';
    });
}

// Initialize common functionalities
document.addEventListener('DOMContentLoaded', () => {
    fetchNotifications();
    fetchMessages();
});