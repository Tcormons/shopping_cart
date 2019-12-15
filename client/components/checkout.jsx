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
    this.props.submitCallback(this.state);
  }

  render() {
    const total = this.props.cart.reduce((accum, item) => (accum + item.price), 0);
    const price = `$${(total / 100).toFixed(2)}`;

    return (
      <div className="container rounded col-11 my-5 p-3 bg-dark shadow">
        <div className="d-flex justify-content-between mb-2">
          <div className='d-flex text-white'>
            <div className="fa fa-arrow-left py-2 fa-lg icon"
              onClick={() => this.props.callback('catalog', {})}
              style={{ cursor: 'pointer' }}></div>
            <h4 className="ml-1"
              onClick={() => this.props.callback('catalog', {})}
              style={{ cursor: 'pointer' }}>
              Back to Catalog</h4>
          </div>
          <div className='d-flex text-white'>
            <h2 className="mr-2">Checkout</h2>
          </div>
          <div className='d-flex text-white'>
            <h5 className="mr-2">Total {price}</h5>
          </div>
        </div>
        <form className="m-2" onSubmit={this.handleSubmitForm}>
          <div className="d-flex justify-content-center form-group">
            <input className="rounded form-control"
              onChange={this.handleFormChange}
              placeholder="Full Name"
              type="name"
              name="name"></input>
          </div>
          <div className="d-flex justify-content-center form-group">
            <input className="rounded form-control"
              onChange={this.handleFormChange}
              placeholder="Credit Card"
              type="creditCard"
              name="creditCard"></input>
          </div>
          <div className="d-flex justify-content-center form-group">
            <textarea className="rounded form-control"
              onChange={this.handleFormChange}
              placeholder="Shipping Address"
              type="shippingAddress"
              name="shippingAddress"></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary justify-content-end">
              Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Checkout;
