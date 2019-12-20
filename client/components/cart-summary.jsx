import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {

  const total = props.cart.reduce((accum, item) => (accum + (item.price * item.quantity)), 0);
  const price = `$${(total / 100).toFixed(2)}`;

  if (props.cart.length === 0) {
    return (
      <div>
        <div className="display-container">
          <div className="col-sm-12 d-flex justify-content-around bg-white sticky-top shadow">
            <div className='d-flex text-black ml-2 align-self-center'
              onClick={() => props.callback('catalog', {})}
              style={{ cursor: 'pointer' }}>
              <div className="fa fa-arrow-left py-2 fa-lg"></div>
              <h4 className="ml-1">Back</h4>
            </div>
            <div className="d-flex text-black flex-column align-self-baseline">
              <h2 className="m-auto cart-display text-center">My Cart</h2>
              <p className="m-2 h4 text-center">{price}</p>
            </div>
            <div className="d-flex cart-checkout text-black mr-2">
              <button className="btn btn-primary m-auto"
                onClick={() => props.viewOrder(props.cart)}>
                Checkout</button>
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
      </div>
    );
  }

  return (
    <div className="display-container">
      <div className="row">
        <div className="col-sm-12 d-flex justify-content-around bg-white sticky-top shadow">
          <div className='d-flex text-black ml-2 align-self-center'
            onClick={() => props.callback('catalog', {})}
            style={{ cursor: 'pointer' }}>
            <div className="fa fa-arrow-left py-2 fa-lg"></div>
            <h4 className="ml-1">Back</h4>
          </div>
          <div className="d-flex text-black flex-column align-self-baseline">
            <h2 className="m-auto cart-display text-center">My Cart</h2>
            <p className="m-2 h4 text-center">{price}</p>
          </div>
          <div className="d-flex cart-checkout text-black mr-2">
            <button className="btn btn-primary m-auto"
              onClick={() => props.viewOrder(props.cart)}>
              Checkout</button>
          </div>
        </div>

        <div className='container-fluid col-12 text-center'>
          {props.cart.map((product, index) => (
            <CartSummaryItem
              key={index}
              product={product}
              callbackRemoveItem={props.removeCallback}
              callbackQuantity={props.quantityCallback} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
