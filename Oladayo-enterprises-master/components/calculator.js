// components/Calculator.js
import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
const [category, setCategory] = useState('');
const [size, setSize] = useState('');
const [quantity, setQuantity] = useState(0);
const [total, setTotal] = useState(0);
const [products, setProducts] = useState([]);

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await axios.post('/api/calculator', {
category,
size,
quantity,
});
setTotal(response.data.total);
setProducts(response.data.products);
} catch (error) {
console.error(error);
}
};

return (
<form onSubmit={handleSubmit}>
<label>
Category:
<input
type="text"
value={category}
onChange={(e) => setCategory(e.target.value)}
/>
</label>
<label>
Size:
<input
type="text"
value={size}
onChange={(e) => setSize(e.target.value)}
/>
</label>
<label>
Quantity:
<input
type="number"
value={quantity}
onChange={(e) => setQuantity(e.target.value)}
/>
</label>
<button type="submit">Calculate</button>
<p>Total: {total}</p>
<ul>
{products.map((product) => (
<li key={product._id}>
<h2>{product.name}</h2>
<p>Category: {product.category}</p>
<p>Size: {product.size}</p>
<p>Price: {product.price}</p>
<p>Quantity: {product.quantity}</p>
</li>
))}
</ul>
</form>
);
}
