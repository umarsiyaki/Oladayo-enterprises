document.getElementById('profile').addEventListener('click', () => {
    // Logic to open the profile modal or page
    // Example: Open a modal with profile details form
    const profileModal = document.getElementById('profile-modal');
    profileModal.style.display = 'block';
  
    // Fetch current profile details and populate the form
    fetch('/api/profile') // Placeholder for fetching profile data
      .then(response => response.json())
      .then(data => {
        document.getElementById('profile-username').value = data.username;
        document.getElementById('profile-email').value = data.email;
        document.getElementById('profile-phone').value = data.phone;
        // Populate other profile fields as needed
      })
      .catch(error => console.error('Error fetching profile:', error));
  
    // Logic to allow user to update details
    document.getElementById('profile-update-btn').addEventListener('click', () => {
      const updatedProfile = {
        username: document.getElementById('profile-username').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value,
        // Collect other updated profile fields as needed
      };
  
      fetch('/api/profile/update', { // Placeholder for updating profile data
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
      })
      .then(response => response.json())
      .then(data => {
        alert('Profile updated successfully!');
        profileModal.style.display = 'none'; // Close the modal
      })
      .catch(error => console.error('Error updating profile:', error));
    });
  });