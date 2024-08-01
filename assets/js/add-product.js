
document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    
    addProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const vendorCategory = document.getElementById('vendorCategory').value;
      const brandCategory = document.getElementById('brandCategory').value;
      const productSize = document.getElementById('productSize').value;
      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
      
      const newProduct = {
        id: Date.now(), // unique ID for the product
        vendorCategory,
        brandCategory,
        productSize,
        productName,
        productPrice
      };
      
      // Fetch current inventory from localStorage or initialize empty array if not present
      let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
      
      // Add new product to inventory
      inventory.push(newProduct);
      
      // Save updated inventory back to localStorage
      localStorage.setItem('inventory', JSON.stringify(inventory));
      
      // Notify admin or cashier (for simplicity, just log to console here)
      console.log('Product added successfully:', newProduct);
      
      // Optionally, reset form after submission
      addProductForm.reset();
    });
    
    addProductForm.addEventListener('reset', () => {
      console.log('Form reset');
    });
  });

  
document.addEventListener('DOMContentLoaded', () => {
  const addProductForm = document.getElementById('addProductForm');

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const vendorCategory = document.getElementById('vendorCategory').value;
    const brandCategory = document.getElementById('brandCategory').value;
    const productSize = document.getElementById('productSize').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    const newProduct = {
      id: Date.now(), // unique ID for the product
      vendorCategory,
      brandCategory,
      productSize,
      productName,
      productPrice
    };

    // Fetch current inventory from localStorage or initialize empty array if not present
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Add new product to inventory
    inventory.push(newProduct);

    // Save updated inventory back to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Notify admin or cashier (for simplicity, just log to console here)
    console.log('Product added successfully:', newProduct);

    // Optionally, reset form after submission
    addProductForm.reset();

    // Redirect to the appropriate dashboard
    const userRole = localStorage.getItem('userRole'); // assuming user role is stored in localStorage
    if (userRole === 'admin') {
      window.location.href = 'admin.html';
    } else if (userRole === 'cashier') {
      window.location.href = 'cashier.html';
    }
  });

  addProductForm.addEventListener('reset', () => {
    console.log('Form reset');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const addProductForm = document.getElementById('addProductForm');

  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const vendorCategory = document.getElementById('vendorCategory').value;
    const brandCategory = document.getElementById('brandCategory').value;
    const productSize = document.getElementById('productSize').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const image = document.querySelector('input[type="file"]').files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newProduct = {
        id: Date.now(),
        vendorCategory,
        brandCategory,
        productSize,
        productName,
        productPrice,
        image: reader.result
      };

      let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
      inventory.push(newProduct);
      localStorage.setItem('inventory', JSON.stringify(inventory));

      alert('Product added successfully');
      addProductForm.reset();
      window.location.href = 'admin.html';
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      reader.onloadend();
    }
  });
});