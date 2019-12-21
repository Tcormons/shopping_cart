import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteConfirmation: false, productDelete: null };

    this.toggleDeleteConfirmation = this.toggleDeleteConfirmation.bind(this);
  }

  toggleDeleteConfirmation(product) {
    this.setState({ deleteConfirmation: !this.state.deleteConfirmation, productDelete: product });
  }

  render() {

    const total = this.props.cart.reduce((accum, item) => (accum + (item.price * item.quantity)), 0);
    const price = `$${(total / 100).toFixed(2)}`;

    if (this.props.cart.length === 0) {
      return (
        <div>
          <div className="display-container">
            <div className="col-sm-12 d-flex justify-content-around bg-white sticky-top shadow">
              <div className='d-flex text-black ml-2 align-self-center'
                onClick={() => this.props.callback('catalog', {})}
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
                  disabled={true}
                  onClick={() => this.props.viewOrder(this.props.cart)}>
                  Checkout</button>
              </div>
            </div>

            <div className="d-flex shadow bg-dark m-3 rounded justify-content-around">
              <div className="body text-white text-center m-3">
                <h5 className="title">Cart is empty!</h5>
                <div className="d-flex justify-content-around m-3">
                  <button className="btn btn-danger"
                    onClick={() => this.props.callback('catalog', {})}>
                    Return to Shopping </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.deleteConfirmation === true) {
      return (
        <div>
          <div className='background-modal'>
            <div className='intro-modal border border-light rounded shadow m-auto d-flex'>
              <div className='m-auto align-self-center text-center'>
                <div>Would like to remove this from your cart? </div>
                <div className='d-flex justify-content-around m-auto'>
                  <button className="btn btn-secondary mt-2"
                    onClick={() => this.toggleDeleteConfirmation()}>Cancel</button>
                  <button className="btn btn-danger mt-2"
                    onClick={() => {
                      this.toggleDeleteConfirmation();
                      this.props.removeCallback(this.state.productDelete);
                    }}>Delete From Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="display-container">
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-around bg-white sticky-top shadow">
                <div className='d-flex text-black ml-2 align-self-center'
                  onClick={() => this.props.callback('catalog', {})}
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
                    onClick={() => this.props.viewOrder(this.props.cart)}>
                    Checkout</button>
                </div>
              </div>
              <div className='container-fluid col-12 text-center'>
                {this.props.cart.map((product, index) => (
                  <CartSummaryItem
                    key={index}
                    product={product}
                    callbackRemoveItem={this.toggleDeleteConfirmation}
                    callbackQuantity={this.props.quantityCallback} />
                ))}
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
              onClick={() => this.props.callback('catalog', {})}
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
                onClick={() => this.props.viewOrder(this.props.cart)}>
                Checkout</button>
            </div>
          </div>

          <div className='container-fluid col-12 text-center'>
            {this.props.cart.map((product, index) => (
              <CartSummaryItem
                key={index}
                product={product}
                callbackRemoveItem={this.toggleDeleteConfirmation}
                callbackQuantity={this.props.quantityCallback} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummary;
