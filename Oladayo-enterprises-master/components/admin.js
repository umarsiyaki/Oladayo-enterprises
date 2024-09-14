
// components/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
const [products, setProducts] = useState([]);
const [inventory, setInventory] = useState({});
const [product, setProduct] = useState('');
const [quantity, setQuantity] = useState(0);

useEffect(() => {
axios.get('/api/products')
.then(response => {
setProducts(response.data);
})
.catch(error => {
console.error(error);
});
}, []);

useEffect(() => {
axios.get('/api/inventory')
.then(response => {
setInventory(response.data);
})
.catch(error => {
console.error(error);
});
}, []);

const handleUpdateInventory = async (e) => {
e.preventDefault();
try {
const response = await axios.post('/api/inventory', {
product,
quantity,
});
setInventory(response.data);
} catch (error) {
console.error(error);
}
};

return (
<div>
<h1>Products</h1>
<ul>
{products.map(product => (
<li key={product._id}>
<h2>{product.name}</h2>
<p>Category: {product.category}</p>
<p>Size: {product.size}</p>
<p>Price: {product.price}</p>
<p>Quantity: {product.quantity}</p>
</li>
))}
</ul>
<h1>Inventory</h1>
<ul>
{Object.keys(inventory).map(product => (
<li key={product}>
<h2>{product}</h2>
<p>Quantity: {inventory[product]}</p>
</li>
))}
</ul>
<form onSubmit={handleUpdateInventory}>
<label>
Product:
<select value={product} onChange={(e) => setProduct(e.target.value)}>
{products.map(product => (
<option key={product._id} value={product.name}>
{product.name}
</option>
))}
</select>
</label>
<label>
Quantity:
<input
type="number"
value={quantity}
onChange={(e) => setQuantity(e.target.value)}
/>
</label>
<button type="submit">Update Inventory</button>
</form>
</div>
);
}

export default Admin;
