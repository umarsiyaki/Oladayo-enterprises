
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