const ProductCard = memo(({ product }) => {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();

  const ProductDetails = () => {
    dispatch(addItemToCart(product));
    dispatch(toggleMinicart(true));
  };

  return (
    <div className='product-card-container'>
      <div className='img-container'>
        <img src={imageUrl} alt={name} loading='lazy' />
        <Button type='button' style='' label='Add to cart' onClick={addProductToCart} />
      </div>
      <div className='product-footer'>
        <h3 className='name'>{name}</h3>
        <p className='price'>$ {price?.toFixed(2)}</p>
      </div>
    </div>
  );
})

export default ProductDetails;