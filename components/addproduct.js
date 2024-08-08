
// components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
const [name, setName] = useState('');
const [category, setCategory] = useState('');
const [size, setSize] = useState('');
const [price, setPrice] = useState(0);
const [quantity, setQuantity] = useState(0);

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await axios.post('/api/products', {
name,
category,
size,
price,
quantity,
});
console.log(response.data);
} catch (error) {
console.error(error);
}
};

return (
<form onSubmit={handleSubmit}>
  <label>
    Name:
    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
  </label>
  <label>
    Category:
    <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)} />
  </label>
  <label>
    Size:
    <input type="text" value={size} onChange={(e)=> setSize(e.target.value)} />
  </label>
  <label>
    Price:
    <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} />
  </label>
  <label>
    Quantity:
    <input type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
  </label>
  <button type="submit">Add Product</button>
</form>
);
}

export default AddProduct;