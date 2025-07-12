import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, toggleMinicart } from '../../store/minicart.reducer';

import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = memo(({ product }) => {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);

  const addProductToCart = () => {
    if (count < 1) return;
    for (let i = 0; i < count; i++) {
      dispatch(addItemToCart(product));
    }
    dispatch(toggleMinicart(true));
    setShowModal(false);
    setCount(1);
  };

  const closeModal = () => {
    setShowModal(false);
    setCount(1);
  };

  const viewdetails = () => {
    setSelectedProduct(product);
    setShowModal(true);
    const updatedProducts = [product];
    localStorage.setItem('selectedProduct', JSON.stringify(updatedProducts));
  };

  const increase = () => setCount(prev => prev + 1);
  const decrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

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
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button className='close-btn' onClick={closeModal}>×</button>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p className='price'>$ {selectedProduct.price?.toFixed(2)}</p>

            <div className='quantity-control'>
              <button onClick={decrease}>−</button>
              <span>{count}</span>
              <button onClick={increase}>+</button>
            </div>

            <button className='shop-btn' onClick={addProductToCart}>Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
});

export default ProductCard;
