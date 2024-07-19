
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