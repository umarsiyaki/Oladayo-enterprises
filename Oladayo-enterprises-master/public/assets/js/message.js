// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const lightThemeBtn = document.getElementById('light-theme-btn');
const darkThemeBtn = document.getElementById('dark-theme-btn');
const minimalistThemeBtn = document.getElementById('minimalist-theme-btn');

lightThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-theme');
  document.body.classList.remove('minimalist-theme');
});

darkThemeBtn.addEventListener('click', () => {
  document.body.classList.add('dark-theme');
  document.body.classList.remove('minimalist-theme');
});

minimalistThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-theme');
  document.body.classList.add('minimalist-theme');
});

// Emoji toggle
const emojiBtn = document.getElementById('emoji-btn');
const emojiContainer = document.getElementById('emoji-container');

emojiBtn.addEventListener('click', () => {
  emojiContainer.style.display = emojiContainer.style.display === 'none' ? 'block' : 'none';
});

// File sharing
const fileInput = document.getElementById('file-input');
const attachFileBtn = document.getElementById('attach-file-btn');

attachFileBtn.addEventListener('click', () => {
  fileInput.click();
});

// Add recipient
const addRecipientBtn = document.getElementById('add-recipient-btn');
const recipientInput = document.getElementById('recipient-input');

addRecipientBtn.addEventListener('click', () => {
  const recipient = recipientInput.value.trim();
  if (recipient) {
    const recipientList = document.getElementById('recipient-list');
    const recipientListItem = document.createElement('li');
    recipientListItem.textContent = recipient;
    recipientList.appendChild(recipientListItem);
    recipientInput.value = '';
  }
});

// Delete recipient
const deleteRecipientBtn = document.getElementById('delete-recipient-btn');
const recipientList = document.getElementById('recipient-list');

deleteRecipientBtn.addEventListener('click', () => {
  const selectedRecipient = recipientList.querySelector('.selected');
  if (selectedRecipient) {
    selectedRecipient.remove();
  }
});

// Send message
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');

sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    const messagesContainer = document.getElementById('messages');
    const messageListItem = document.createElement('li');
    messageListItem.textContent = message;
    messagesContainer.appendChild(messageListItem);
    messageInput.value = '';
  }
});

// Select recipient
recipientList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const selectedRecipient = recipientList.querySelector('.selected');
    if (selectedRecipient) {
      selectedRecipient.classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
});

// Emoji selection
emojiContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const emoji = e.target.src;
    messageInput.value += emoji;
    emojiContainer.style.display = 'none';
  }
});

// File attachment
fileInput.addEventListener('change', (e) => {
  const file = fileInput.files[0];
  const fileName = file.name;
  const fileSize = file.size;
  const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
  const attachmentList = document.getElementById('attachment-list');
  const attachmentListItem = document.createElement('li');
  attachmentListItem.innerHTML = `${fileName} (${fileSizeMB} MB)`;
  attachmentList.appendChild(attachmentListItem);
});

// Delete attachment
const deleteAttachmentBtn = document.getElementById('delete-attachment-btn');
deleteAttachmentBtn.addEventListener('click', () => {
  const selectedAttachment = attachmentList.querySelector('.selected');
  if (selectedAttachment) {
    selectedAttachment.remove();
  }
});

// Select attachment
attachmentList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const selectedAttachment = attachmentList.querySelector('.selected');
    if (selectedAttachment) {
      selectedAttachment.classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
});

// Conversation list
conversationList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const conversationId = e.target.dataset.conversationId;
    const conversation = conversations.find((c) => (link unavailable) === conversationId);
    if (conversation) {
      const conversationView = document.getElementById('conversation-view');
      conversationView.innerHTML = '';
      conversationView.appendChild(renderConversation(conversation));
    }
  }
});

// Render conversation
function renderConversation(conversation) {
  const conversationHtml = `
    <div class="header">
      <img src="${conversation.user.image}" alt="${conversation.user.name}">
      <span>${conversation.user.name}</span>
      <span class="status">${conversation.user.status}</span>
    </div>
    <div class="messages">
      <ul>
        ${conversation.messages.map((message) => `
          <li>
            <p>${message.text}</p>
            <span>${message.timestamp}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  return HTMLParser.parseFromString(conversationHtml, 'text/html').body.firstChild;
}