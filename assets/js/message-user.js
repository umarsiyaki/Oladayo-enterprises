document.addEventListener('DOMContentLoaded', function() {
  const messageForm = document.getElementById('message-user-form');
  const userEmailInput = document.getElementById('user-email');
  const messageSubjectInput = document.getElementById('message-subject');
  const messageContentInput = document.getElementById('message-content');
  const messagesContainer = document.getElementById('messages-container');
  const notificationsContainer = document.getElementById('notifications-container');
  
  // Fetch existing messages and notifications
  fetch('/api/messages')
    .then(response => response.json())
    .then(messages => {
      messages.forEach(message => {
        addMessageToContainer(message);
      });
    })
    .catch(error => console.error('Error fetching messages:', error));

  fetch('/api/notifications')
    .then(response => response.json())
    .then(notifications => {
      notifications.forEach(notification => {
        addNotificationToContainer(notification);
      });
    })
    .catch(error => console.error('Error fetching notifications:', error));

  messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userEmail = userEmailInput.value;
    const messageSubject = messageSubjectInput.value;
    const messageContent = messageContentInput.value;
    
    // Validate form input
    if (!userEmail || !messageSubject || !messageContent) {
      alert('Please fill in all fields.');
      return;
    }

    const messageData = {
      userEmail,
      messageSubject,
      messageContent
    };
    
    // Send message to server
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent:', data);
      addMessageToContainer(data);
      messageForm.reset();
    })
    .catch(error => console.error('Error sending message:', error));
  });

  function addMessageToContainer(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
      <p><strong>To:</strong> ${message.userEmail}</p>
      <p><strong>Subject:</strong> ${message.messageSubject}</p>
      <p><strong>Content:</strong> ${message.messageContent}</p>
    `;
    messagesContainer.appendChild(messageDiv);
  }

  function addNotificationToContainer(notification) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'notification';
    notificationDiv.innerHTML = `<p>${notification.message}</p>`;
    notificationsContainer.appendChild(notificationDiv);
  }
});
