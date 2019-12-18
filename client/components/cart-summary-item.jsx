import React from 'react';

function CartSummaryItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="cart-item shadow bg-dark m-3 rounded justify-content-around">
      <img className="img ml-3 m-3 rounded" src={props.product.image} />
      <div className="body text-white m-3 align-self-center">
        <h5 className="title">{props.product.name}</h5>
        <div className="mt-3">
          <p className="price">{price}</p>
          <p className="text">{props.product.shortDescription}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger"
              onClick={() => props.callback(props.product)}>
              Remove </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
