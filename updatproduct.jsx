
// UpdateProductForm.jsx
import React, { useState, useEffect } from 'react';

const UpdateProductForm = ({ productId, onFormSubmit }) => {
  const [product, setProduct] = useState({
    vendorCategory: '',
    brandCategory: '',
    productSize: '',
    productName: '',
    productPrice: '',
    image: ''
  });

  useEffect(() => {
    // Fetch the product details from localStorage or server using productId
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const productToUpdate = inventory.find(p => p.id === productId);
    if (productToUpdate) {
      setProduct(productToUpdate);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Category by Vendor:</label>
      <select name="vendorCategory" value={product.vendorCategory} onChange={handleChange}>
        <option>Coca-Cola</option>
        <option>Viju</option>
        <option>Maltina</option>
        <option>Holandia</option>
        <option>Bigi</option>
        <option>Pepsi</option>
        <option>Slim</option>
        <option>Lucozade</option>
      </select>

      <div className="category-by-activity">
        <label htmlFor="category-by-activity">Drink Functions Category:</label>
        <aside id="Maltina">
          <select name="brandCategory" value={product.brandCategory} onChange={handleChange}>
            <option value="maltina">Maltina</option>
            <option value="hi-malt">Hi-malt</option>
            <option value="malta-guinness">Malta Guinness</option>
          </select>
        </aside>
        {/* Add other categories similarly */}
      </div>

      <label>Product Size:</label>
      <select name="productSize" value={product.productSize} onChange={handleChange}>
        <option>45cm</option>
        <option>1 liter</option>
        <option>600ml</option>
        <option>30cm</option>
        <option>50cm</option>
        <option>60cm</option>
        <option>25cm</option>
      </select>

      <label>Product Name:</label>
      <input type="text" name="productName" value={product.productName} onChange={handleChange} />

      <label>Price:</label>
      <input type="number" name="productPrice" value={product.productPrice} onChange={handleChange} />

      <label>Image:</label>
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Update Product</button>
      <button type="reset" onClick={() => setProduct({ vendorCategory: '', brandCategory: '', productSize: '', productName: '', productPrice: '', image: '' })}>Reset</button>
    </form>
  );
};

export default UpdateProductForm;