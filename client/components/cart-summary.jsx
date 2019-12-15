import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const total = props.cart.reduce((accum, item) => (accum + item.price), 0);
  const price = `$${(total / 100).toFixed(2)}`;

  return (
    <div>
      <div className="col-sm-12 d-flex justify-content-between bg-white sticky-top shadow">
        <div className='d-flex text-black mt-3 ml-5'
          onClick={() => props.callback('catalog', {})}
          style={{ cursor: 'pointer' }}>
          <div className="fa fa-arrow-left py-2 fa-lg icon"></div>
          <h4 className="ml-1">Back to Catalog</h4>
        </div>
        <div className="d-flex text-black">
          <h2 className="mr-3 mt-2">My Cart</h2>
        </div>
        <div className="d-flex text-black mr-5">
          <button className="btn btn-primary m-2"
            onClick={() => props.viewOrder(props.cart)}>
            Checkout</button>
          <p className="mr-2 mt-3 h4">{price}</p>
        </div>
      </div>

      <div className='container-fluid col-md-11'>
        {props.cart.map((product, index) => (
          <CartSummaryItem
            key={index}
            product={product}
            callback={props.removeCallback} />
        ))}
      </div>
    </div>
  );
}

export default CartSummary;
