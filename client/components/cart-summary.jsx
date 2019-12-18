import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const total = props.cart.reduce((accum, item) => (accum + item.price), 0);
  const price = `$${(total / 100).toFixed(2)}`;

  if (props.cart.length === 0) {
    return (
      <div>
        <div className="col-sm-12 d-flex justify-content-between bg-white sticky-top shadow">
          <div className='d-flex text-black ml-2 align-self-center'
            onClick={() => props.callback('catalog', {})}
            style={{ cursor: 'pointer' }}>
            <div className="fa fa-arrow-left py-2 fa-lg icon"></div>
            <h4 className="ml-1">Back</h4>
          </div>
          <div className="d-flex text-black align-self-center">
            <h2 className="m-1 cart-display text-center">My Cart</h2>
          </div>
          <div className="d-flex cart-checkout text-black mr-2">
            <button className="btn btn-primary m-2"
              disabled='true'
              onClick={() => props.viewOrder(props.cart)}>
              Checkout</button>
            <p className="m-2 h4">{price}</p>
          </div>
        </div>

        <div className="d-flex shadow bg-dark m-3 rounded justify-content-around">
          <div className="body text-white text-center m-3">
            <h5 className="title">Cart is empty!</h5>
            <div className="d-flex justify-content-around m-3">
              <button className="btn btn-danger"
                onClick={() => props.callback('catalog', {})}>
                Return to Shopping </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="col-sm-12 d-flex justify-content-around bg-white sticky-top shadow">
        <div className='d-flex text-black ml-2 align-self-center'
          onClick={() => props.callback('catalog', {})}
          style={{ cursor: 'pointer' }}>
          <div className="fa fa-arrow-left py-2 fa-lg icon"></div>
          <h4 className="ml-1">Back</h4>
        </div>
        <div className="d-flex text-black align-self-center">
          <h2 className="m-1 cart-display text-center">My Cart</h2>
        </div>
        <div className="d-flex cart-checkout text-black mr-2">
          <button className="btn btn-primary m-2"
            onClick={() => props.viewOrder(props.cart)}>
            Checkout</button>
          <p className="m-2 h4">{price}</p>
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
