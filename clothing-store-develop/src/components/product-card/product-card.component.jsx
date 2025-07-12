import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, toggleMinicart } from '../../store/minicart.reducer';
import React, { useState } from 'react';

import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = memo(({ product }) => {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProductToCart = () => {
    dispatch(addItemToCart(product));
    dispatch(toggleMinicart(true));
  };
   const closeModal = () => {
    setShowModal(false);
  };

  
  const viewdetails = () => {
     setSelectedProduct(product);
    setShowModal(true);
  console.log(product);

  // Get existing products from localStorage (array)
  const existingProducts = JSON.parse(localStorage.getItem('selectedProduct')) || [];

  // Add the current product
  const updatedProducts = [ product];

  // Save back to localStorage
  localStorage.setItem('selectedProduct', JSON.stringify(updatedProducts));
};

  return (
    <>
    <div className='product-card-container'>
      <div className='img-container'>
        <img src={imageUrl} alt={name} loading='lazy' />
        <Button type='button' style='' label='View Details' onClick={viewdetails} />
      </div>
      <div className='product-footer'>
        <h3 className='name'>{name}</h3>
        <p className='price'>$ {price?.toFixed(2)}</p>
      </div>
    </div>
{showModal && selectedProduct && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-btn" onClick={closeModal}>×</button>
      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
      <h2>{selectedProduct.name}</h2>
      <p className="price">$ {selectedProduct.price?.toFixed(2)}</p>
      <button className="shop-btn"  onClick={addProductToCart} >Shop</button>
    </div>
  </div>
)}
      </>
  );
})

export default ProductCard;
