// src/components/list-item.jsx
import React, { useState } from 'react';
import './list-item.styles.scss';

const ListItemPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, price, image };
    console.log('Submitting product:', productData);
    alert(`Product will be added after review:\nName: ${name}\nPrice: ₹${price}`);
    setName('');
    setPrice('');
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="list-item-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="list-item-form">
        <div className="form-field">
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="image-preview" />
        )}
        <div className="form-field">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Price (₹):</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ListItemPage;
