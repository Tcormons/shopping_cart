import React from 'react';

function ProductListItem(props) {
  const price = `$${(props.product.price / 100).toFixed(2)}`;

  return (
    <div className="col-4 my-3 d-flex">
      <div className="card">
        <img className="card-img-top img" src={props.product.image} />
        <div className="card-body text-white bg-dark ">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-price">{price}</p>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
