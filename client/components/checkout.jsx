import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: null,
      shippingAddress: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleFormChange(event) {
    const state = {};
    const newValue = (event.target.name === 'creditCard') ? parseInt(event.target.value) : event.target.value;
    state[event.target.name] = newValue;
    this.setState(state);
  }

  handleSubmitForm(event) {
    event.preventDefault();
    if (this.state.name === '' || this.state.creditCard === '' || this.state.shippingAddress === '') {
      return;
    }
    this.props.submitCallback(this.state);
  }

  render() {
    const total = this.props.cart.reduce((accum, item) => (accum + item.price), 0);
    const price = `$${(total / 100).toFixed(2)}`;

    return (
      <div className='checkout-container'>
        <div className="container rounded col-11 mt-4 p-2 bg-dark shadow">
          <div className="d-flex justify-content-between mb-2">
            <div className='d-flex text-white align-self-baseline'>
              <div className="fa fa-arrow-left py-2 fa-lg"
                onClick={() => this.props.callback('catalog', {})}
                style={{ cursor: 'pointer' }}></div>
              <h4 className="ml-1"
                onClick={() => this.props.callback('catalog', {})}
                style={{ cursor: 'pointer' }}>
                Back</h4>
            </div>
            <div className='text-white align-self-baseline'>
              <h2 className="">Checkout</h2>
            </div>
            <div className='text-white align-self-baseline'>
              <div className="h5">{price}</div>
            </div>
          </div>
          <form className="m-2"
            onSubmit={this.handleSubmitForm}>
            <div className="d-flex justify-content-center form-group">
              <input className="rounded checkout-input form-control"
                onChange={this.handleFormChange}
                placeholder="Full Name"
                type="name"
                name="name"></input>
            </div>
            <div className="d-flex justify-content-center form-group">
              <input className="rounded checkout-input form-control"
                onChange={this.handleFormChange}
                placeholder="Credit Card"
                type="number"
                name="creditCard"></input>
            </div>
            <div className="d-flex justify-content-center form-group">
              <textarea className="rounded checkout-input form-control"
                onChange={this.handleFormChange}
                placeholder="Shipping Address"
                type="shippingAddress"
                name="shippingAddress"></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary justify-content-end"
                disabled={!!(this.state.name === '' ||
                this.state.creditCard === '' ||
                this.state.shippingAddress === '')}>
                Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
