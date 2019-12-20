import React from 'react';

function CartSummaryItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;
  return (
    <div className="cart-item bg-dark rounded justify-content-around">
      <img className="img m-auto rounded" src={props.product.image} />
      <div className="body text-white m-3 text-center">
        <h5 className="title">{props.product.name}</h5>
        <div className="mt-3 text-center">
          <div className="price">{price}</div>
          <div className='text-center m-auto'>
            <p className="mr-3"> Quantity </p>
            <i className="fa fa-minus-circle fa-lg m-2"
              aria-hidden="true"></i>
            <input className="value text-center"
              placeholder={props.product.quantity}
              user-select='none'
              style={{ width: '10vw' }} />
            <i className="fa fa-plus-circle fa-lg m-2"
              aria-hidden="true"></i>
          </div>
          <p className="text">{props.product.shortDescription}</p>
          <div className="text-right">
            <button className="btn btn-danger"
              onClick={() => props.callback(props.product)}>
              Remove Item </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default CartSummaryItem;
