import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slideshow from './components/Slideshow';  // Make sure these paths are correct
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const addProduct = (product) => {
    axios.post('/api/products', product)
      .then(response => {
        setProducts([...products, response.data]);
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
      });
  };

  const updateProduct = (id, updatedProduct) => {
    axios.put(`/api/products/${id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(product => product.id === id ? response.data : product));
      })
      .catch(error => {
        console.error('There was an error updating the product!', error);
      });
  };

  const deleteProduct = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(response => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  return (
    <div className="App">
      <Slideshow products={products.slice(0, 5)} />
      <ProductList products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
      <AddProductForm addProduct={addProduct} />
    </div>
  );
};

export default App;


