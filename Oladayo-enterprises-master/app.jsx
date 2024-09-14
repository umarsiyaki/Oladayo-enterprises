
// App.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import UpdateProductForm from './UpdateProductForm';

const App = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id');

  const handleFormSubmit = (updatedProduct) => {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const productIndex = inventory.findIndex(p => p.id === updatedProduct.id);
    if (productIndex !== -1) {
      inventory[productIndex] = updatedProduct;
      localStorage.setItem('inventory', JSON.stringify(inventory));
      alert('Product updated successfully');
      window.location.href = 'admin.html';
    } else {
      alert('Product not found');
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <UpdateProductForm productId={productId} onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;