
document.addEventListener("DOMContentLoaded", () => {
    const notificationDropdown = document.querySelector(".nav-item.dropdown a[data-bs-toggle='dropdown'][href='#']");

    if (notificationDropdown) {
        notificationDropdown.addEventListener("click", () => {
            fetchNotifications();
        });
    }

    function fetchNotifications() {
        // Example fetch for notifications
        fetch('/api/notifications')
            .then(response => response.json())
            .then(notifications => {
                populateNotifications(notifications);
            })
            .catch(error => console.error('Error fetching notifications:', error));
    }

    function populateNotifications(notifications) {
        const notificationContainer = document.querySelector(".dropdown-menu.dropdown-menu-end.bg-secondary.border-0.rounded-0.rounded-bottom.m-0");
        notificationContainer.innerHTML = '';
        notifications.forEach(notification => {
            const notificationItem = document.createElement("a");
            notificationItem.href = "#";
            notificationItem.classList.add("dropdown-item");
            notificationItem.innerHTML = `
                <h6 class="fw-normal mb-0">${notification.message}</h6>
                <small>${notification.time}</small>
            `;
            notificationContainer.appendChild(notificationItem);
            notificationContainer.appendChild(document.createElement("hr")).classList.add("dropdown-divider");
        });
        const seeAllNotifications = document.createElement("a");
        seeAllNotifications.href = "#";
        seeAllNotifications.classList.add("dropdown-item", "text-center");
        seeAllNotifications.innerText = "See all notifications";
        notificationContainer.appendChild(seeAllNotifications);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const notificationDropdown = document.querySelector(".nav-item.dropdown a[data-bs-toggle='dropdown'][href='#']");

    if (notificationDropdown) {
        notificationDropdown.addEventListener("click", () => {
            fetchNotifications();
        });
    }

    function fetchNotifications() {
        // Example fetch for notifications
        fetch('/api/notifications')
            .then(response => response.json())
            .then(notifications => {
                populateNotifications(notifications);
            })
            .catch(error => console.error('Error fetching notifications:', error));
    }

    function populateNotifications(notifications) {
        const notificationContainer = document.querySelector(".dropdown-menu.dropdown-menu-end.bg-secondary.border-0.rounded-0.rounded-bottom.m-0");
        notificationContainer.innerHTML = '';
        notifications.forEach(notification => {
            const notificationItem = document.createElement("a");
            notificationItem.href = "#";
            notificationItem.classList.add("dropdown-item");
            notificationItem.innerHTML = `
                <h6 class="fw-normal mb-0">${notification.message}</h6>
                <small>${notification.time}</small>
            `;
            notificationContainer.appendChild(notificationItem);
            notificationContainer.appendChild(document.createElement("hr")).classList.add("dropdown-divider");
        });
        const seeAllNotifications = document.createElement("a");
        seeAllNotifications.href = "#";
        seeAllNotifications.classList.add("dropdown-item", "text-center");
        seeAllNotifications.innerText = "See all notifications";
        notificationContainer.appendChild(seeAllNotifications);
    }
});