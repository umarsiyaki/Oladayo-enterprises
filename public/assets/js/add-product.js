document.addEventListener('DOMContentLoaded', () => {
  const addProductForm = document.getElementById('addProductForm');

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetch values from form fields
    const vendorCategory = document.getElementById('vendorCategory').value;
    const brandCategory = document.getElementById('brandCategory').value;
    const productSize = document.getElementById('productSize').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDesc = document.getElementById('productDescription')?.value || ''; // Optional description
    const image = document.querySelector('input[type="file"]').files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Create new product object
      const newProduct = {
        id: Date.now(),
        vendorCategory,
        brandCategory,
        productSize,
        productName,
        productPrice,
        productDesc,
        image: reader.result
      };

      // Retrieve existing inventory or initialize an empty array
      let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
      inventory.push(newProduct);

      // Save updated inventory to localStorage
      localStorage.setItem('inventory', JSON.stringify(inventory));

      // Also save to external database (simulated)
      saveToDatabase(newProduct);

      // Notify the user and reset the form
      alert('Product added successfully');
      addProductForm.reset();

      // Redirect to marketing.html
      window.location.href = 'marketing.html';
    };

    // Read the image if it exists, else proceed with form submission
    if (image) {
      reader.readAsDataURL(image);
    } else {
      reader.onloadend(); // Manually trigger onloadend if no image is selected
    }
  });

  addProductForm.addEventListener('reset', () => {
    console.log('Form reset');
  });
});

// Function to simulate saving to an external database
function saveToDatabase(product) {
  const database = localStorage.getItem('../../database.js');
  let data = database ? JSON.parse(database) : [];
  data.push(product);
  localStorage.setItem('../../database.js', JSON.stringify(data));
}
