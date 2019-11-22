import React from 'react';

function CartSummaryItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="d-flex bg-dark mb-3 rounded">
      <img className="img ml-5 m-3 rounded" src={props.product.image} />
      <div className="body text-white mt-5">
        <h5 className="title">{props.product.name}</h5>
        <p className="price">{price}</p>
        <p className="text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
