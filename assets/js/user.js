
document.addEventListener('DOMContentLoaded', function() {
const notificationsDropdown = document.getElementById('notifications');
const messagingWindow = document.getElementById('messaging-window');
const openMessagingBtn = document.getElementById('open-messaging-btn');
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message-btn');
const messages = document.getElementById('messages');

function showNotification(message) {
const notification = document.createElement('div');
notification.className = 'notification';
notification.textContent = message;
notificationsDropdown.appendChild(notification);
}

function addMessage(sender, content) {
const message = document.createElement('div');
message.className = 'message';
message.innerHTML = `<strong>${sender}:</strong> ${content}`;
messages.appendChild(message);
}

openMessagingBtn.addEventListener('click', () => {
messagingWindow.classList.toggle('open');
});

sendMessageBtn.addEventListener('click', () => {
const content = messageInput.value;
if (content) {
addMessage('You', content);
// Simulate sending the message to the server
setTimeout(() => {
addMessage('Admin', `Response to: ${content}`);
}, 1000);
messageInput.value = '';
}
});

// Simulate receiving notifications
setInterval(() => {
showNotification('New notification received.');
}, 5000);
});


