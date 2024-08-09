
const updateProductInfo = async (productId, updatedInfo) => {
    try {
        const response = await fetch(`/api/admin/updateProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            console.log('Product updated:', updatedProduct);
        } else {
            console.error('Error updating product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching products');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Products List</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slideshow from './components/Slideshow';
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

  const deleteProduct = (id) => {  // Fixed the function name from Product to deleteProduct
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