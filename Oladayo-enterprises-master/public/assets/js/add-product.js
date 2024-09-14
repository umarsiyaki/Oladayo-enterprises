
document.addEventListener('DOMContentLoaded', () => {
  const addProductForm = document.getElementById('addProductForm');

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const vendorCategory = document.getElementById('vendorCategory').value || 'Default Vendor';
    const brandCategory = document.getElementById('brandCategory').value || 'Default Brand';
    const productSize = document.getElementById('productSize').value || 'Default Size';
    const productName = document.getElementById('productName').value || 'Default Name';
    const productPrice = document.getElementById('productPrice').value || 0;
    const image = document.getElementById('productImage').files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newProduct = {
        id: Date.now(), // unique ID for the product
        vendorCategory,
        brandCategory,
        productSize,
        productName,
        productPrice,
        image: reader.result || 'default-image.jpg' // Fallback to a default image
      };

      let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
      inventory.push(newProduct);
      localStorage.setItem('inventory', JSON.stringify(inventory));

      alert('Product added successfully');
      addProductForm.reset();

      // Redirect to the appropriate dashboard
      const userRole = localStorage.getItem('userRole'); // assuming user role is stored in localStorage
      if (userRole === 'admin') {
        window.location.href = 'admin.html';
      } else if (userRole === 'cashier') {
        window.location.href = 'cashier.html';
      }
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      reader.onloadend();
    }
  });

  addProductForm.addEventListener('reset', () => {
    console.log('Form reset');
  });
});