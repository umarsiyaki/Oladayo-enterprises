
document.addEventListener("DOMContentLoaded", () => {
    const messageDropdown = document.querySelector(".nav-item.dropdown a[data-bs-toggle='dropdown'][href='#']");

    if (messageDropdown) {
        messageDropdown.addEventListener("click", () => {
            fetchMessages();
        });
    }

    function fetchMessages() {
        // Example fetch for messages
        fetch('/api/messages')
            .then(response => response.json())
            .then(messages => {
                populateMessages(messages);
            })
            .catch(error => console.error('Error fetching messages:', error));
    }



    document.getElementById('message-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var messageContent = document.getElementById('message-content').value;
      
      // Simulate sending a message (replace this with actual message sending logic)
      setTimeout(function() {
        var messagesDiv = document.getElementById('messages');
        var newMessage = document.createElement('div');
        newMessage.textContent = 'You: ' + messageContent;
        messagesDiv.appendChild(newMessage);
        
        document.getElementById('message-content').value = '';
        
        // Show the message area
        document.getElementById('message-area').classList.add('show');
      }, 500);
    });

    // Simulate receiving a message
    setTimeout(function() {
      var messagesDiv = document.getElementById('messages');
      var newMessage = document.createElement('div');
      newMessage.textContent = 'Admin: Hello, how can we assist you?';
      messagesDiv.appendChild(newMessage);
      
      // Show the message area
      document.getElementById('message-area').classList.add('show');
    }, 2000);


    function populateMessages(messages) {
        const messageContainer = document.querySelector(".dropdown-menu.dropdown-menu-end.bg-secondary.border-0.rounded-0.rounded-bottom.m-0");
        messageContainer.innerHTML = '';
        messages.forEach(message => {
            const messageItem = document.createElement("a");
            messageItem.href = "#";
            messageItem.classList.add("dropdown-item");
            messageItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <img class="rounded-circle" src="${message.image}" alt="" style="width: 40px; height: 40px;">
                    <div class="ms-2">
                        <h6 class="fw-normal mb-0">${message.sender} sent you a message</h6>
                        <small>${message.time}</small>
                    </div>
                </div>
            `;
            messageContainer.appendChild(messageItem);
            messageContainer.appendChild(document.createElement("hr")).classList.add("dropdown-divider");
        });
        const seeAllMessages = document.createElement("a");
        seeAllMessages.href = "#";
        seeAllMessages.class

List.add("dropdown-item", "text-center");
        seeAllMessages.innerText = "See all messages";
        messageContainer.appendChild(seeAllMessages);
    }
});


// Function to fetch messages
const fetchMessages = async () => {
    try {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'bg-light rounded p-3 mb-3';
            messageElement.innerHTML = `
                <div class="d-flex justify-content-between">
                    <p>${message.content}</p>
                    <button class="btn btn-danger btn-sm" onclick="deleteMessage(${message.id})">Delete</button>
                </div>
                <small class="text-muted">${new Date(message.createdAt).toLocaleString()}</small>
            `;
            messagesContainer.appendChild(messageElement);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

// Function to send a new message
const sendMessage = async (event) => {
    event.preventDefault();
    const messageContent = document.getElementById('messageContent').value;
    try {
        await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: messageContent }),
        });
        document.getElementById('message-form').reset();
        fetchMessages();
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// Function to delete a message
const deleteMessage = async (messageId) => {
    try {
        await fetch(`/api/messages/${messageId}`, {
            method: 'DELETE',
        });
        fetchMessages();
    } catch (error) {
        console.error('Error deleting message:', error);
    }
};


document.getElementById('message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const messageContent = document.getElementById('messageContent').value;
    if (messageContent.trim() === '') {
      return;
    }
    
    const messageContainer = document.createElement('div');
    messageContainer.className = 'd-flex align-items-center rounded-circle ms-2 fw-normal text-muted';
    messageContainer.textContent = messageContent;
    
    document.getElementById('messages-container').appendChild(messageContainer);
    document.getElementById('messageContent').value = '';
  });
// Initialize the messages on page load
document.addEventListener('DOMContentLoaded', fetchMessages);

// Add event listener to the form
document.getElementById('message-form').addEventListener('submit', sendMessage);