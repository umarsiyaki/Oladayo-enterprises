
document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("message-form");
  const messageContent = document.getElementById("messageContent");
  const messageContainer = document.getElementById("message-container");
  const messageCount = document.getElementById("message-count");
  const notificationCount = document.getElementById("notification-count");

  // Sample data to simulate fetching messages from the server
  const messages = [
      { content: "Order #1234 has been confirmed.", sender: "Admin", timestamp: "2023-07-31 12:45" },
      { content: "New product added to the inventory.", sender: "Cashier", timestamp: "2023-07-31 13:00" },
  ];

  // Function to display messages
  function displayMessages() {
      messageContainer.innerHTML = "";
      messages.forEach(message => {
          const messageElement = document.createElement("div");
          messageElement.classList.add("message-item");
          messageElement.innerHTML = `
              <div class="message-header">
                  <strong>${message.sender}</strong> <span class="text-muted">${message.timestamp}</span>
              </div>
              <div class="message-body">
                  ${message.content}
              </div>
          `;
          messageContainer.appendChild(messageElement);
      });
      updateMessageCount();
  }

  // Function to update message count
  function updateMessageCount() {
      messageCount.textContent = messages.length;
  }

  // Add event listener to the message form
  messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newMessage = {
          content: messageContent.value,
          sender: "User", // Change to the actual user
          timestamp: new Date().toLocaleString()
      };
      messages.push(newMessage);
      displayMessages();
      messageContent.value = "";
  });

  // Initial display of messages
  displayMessages();
});


document.addEventListener('DOMContentLoaded', function () {
    // Load messages from local storage
    loadMessages();

    // Handle message form submission
    document.getElementById('message-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get recipient and message content
        const recipient = document.getElementById('recipient').value;
        const messageContent = document.getElementById('messageContent').value;

        // Validate inputs
        if (recipient.trim() === '' || messageContent.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Create a new message object
        const message = {
            recipient: recipient,
            content: messageContent,
            timestamp: new Date().toLocaleString(),
        };

        // Save the message to local storage
        saveMessage(message);

        // Clear form inputs
        document.getElementById('recipient').value = '';
        document.getElementById('messageContent').value = '';

        // Notify user
        alert('Message sent successfully.');
    });
});

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    loadMessages();
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageContainer = document.getElementById('message-container');
    const messageCount = document.getElementById('message-count');

    messageContainer.innerHTML = '';

    messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-item', 'bg-dark', 'text-white', 'p-3', 'mb-3', 'rounded');
        messageElement.innerHTML = `
            <h5 class="mb-1">To: ${message.recipient}</h5>
            <p class="mb-1">${message.content}</p>
            <small class="text-muted">${message.timestamp}</small>
        `;
        messageContainer.appendChild(messageElement);
    });

    messageCount.textContent = messages.length;
}