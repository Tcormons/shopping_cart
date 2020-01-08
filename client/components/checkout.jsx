import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: false,
      email: '',
      emailValid: false,
      phone: '',
      phoneValid: false,
      address: '',
      addressValid: false,
      state: 'CA',
      stateValid: false,
      country: 'United States',
      countryValid: false,
      zipcode: '',
      zipcodeValid: false,
      creditCard: '',
      creditCardValid: false,
      creditCardExpiration: '',
      creditCardExpierationValid: false,
      creditCardCVV: '',
      creditCardCVVValid: false,
      acknowledge: false
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleAcknowledgeChange = this.handleAcknowledgeChange.bind(this);
  }

  handleFormChange(event) {
    switch (event.target.name) {
      case 'phone':
      case 'creditCard':
      case 'zipcode':
      case 'creditCardExpiration':
      case 'creditCardCVV':
        if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      default: this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleValidation(field) {
    switch (field) {
      case 'name':
        if (this.state.name.length < 5) {
          this.setState({ nameValid: true });
        } else {
          this.setState({ nameValid: false });
        }
        break;

      case 'email':
        const validEmail = () => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.state.email);

        if (this.state.email.length < 6 && validEmail) {
          this.setState({ emailValid: true });
        } else {
          this.setState({ emailValid: false });
        }
        break;

      case 'phone':
        const validPhone = () => /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(this.state.phone);

        if (this.state.phone.length < 10 && validPhone) {
          this.setState({ phoneValid: true });
        } else {
          this.setState({ phoneValid: false });
        }
        break;

      case 'address':
        if (this.state.address.length < 6) {
          this.setState({ addressValid: true });
        } else {
          this.setState({ addressValid: false });
        }
        break;

      case 'zipcode':
        if (this.state.address.length < 5) {
          this.setState({ zipcodeValid: true });
        } else {
          this.setState({ zipcodeValid: false });
        }
        break;

      case 'creditCard':
        const validCreditCard = () => /^\(\d{3}\)\s*\d{3}(?:-|\s*)\d{4}$/.test(this.state.creditCard);

        if (this.state.creditCard.length < 16 && validCreditCard) {
          this.setState({ creditCardValid: true });
        } else {
          this.setState({ creditCardValid: false });
        }
        break;

      case 'creditCardExpiration':
        if (this.state.address.length < 7) {
          this.setState({ creditCardExpierationValid: true });
        } else {
          this.setState({ creditCardExpierationValid: false });
        }
        break;

      case 'creditCardCVV':
        if (this.state.address.length < 5) {
          this.setState({ creditCardCVVValid: true });
        } else {
          this.setState({ creditCardCVVValid: false });
        }
        break;

      default:
    }

  }

  handleAcknowledgeChange() {
    this.setState({ acknowledge: !this.state.acknowledge });
  }

  handleSubmitForm(event) {
    event.preventDefault();
    const cart = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      creditCard: this.state.creditCard,
      creditCardCVV: this.state.creditCardCVV,
      shippingAddress: `${this.state.address} ${this.state.zipcode} ${this.state.state} ${this.state.country}`
    };
    this.props.submitCallback(cart);
  }

  render() {
    const total = this.props.cart.reduce((accum, item) => (accum + (item.price * item.quantity)), 0);
    const price = `$${(total / 100).toFixed(2)}`;

    return (
      <div className='container'>
        <div className="col-sm-10 col-md-6 mx-auto">
          <div className='checkout-container'>
            <div className="container rounded mt-4 p-2 bg-dark shadow">
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
                <div className="d-flex justify-content-center form-group form-input">
                  <input className={this.state.nameValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                    onChange={() => this.handleFormChange(event)}
                    onBlur={field => this.handleValidation('name')}
                    maxLength="65"
                    placeholder="Full Name"
                    type="name"
                    value={this.state.name}
                    name="name"
                    style={{ cursor: 'text' }}></input>
                </div>
                <div className="d-flex justify-content-center form-group form-input">
                  <input className={this.state.emailValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                    onChange={() => this.handleFormChange(event)}
                    onBlur={field => this.handleValidation('email')}
                    maxLength="254"
                    placeholder="Email"
                    value={this.state.email}
                    type="name"
                    name="email"></input>
                </div>
                <div className="d-flex justify-content-center form-group form-input">
                  <input className={this.state.phoneValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                    onChange={() => this.handleFormChange(event)}
                    onBlur={field => this.handleValidation('phone')}
                    placeholder="Phone"
                    maxLength="11"
                    type="text"
                    value={this.state.phone}
                    name="phone"></input>
                </div>
                <div className="d-flex justify-content-center form-group form-input">
                  <input className={this.state.addressValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                    onChange={() => this.handleFormChange(event)}
                    onBlur={field => this.handleValidation('address')}
                    placeholder="Address"
                    maxLength="42"
                    value={this.state.address}
                    type="name"
                    name="address"></input>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-center form-group col-6 form-input">
                    <input className={this.state.zipcodeValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                      onChange={() => this.handleFormChange(event)}
                      onBlur={field => this.handleValidation('zipcode')}
                      placeholder="Zipcode"
                      maxLength="10"
                      type="text"
                      value={this.state.zipcode}
                      name="zipcode"></input>
                  </div>
                  <div className="d-flex justify-content-center form-group col-6 form-input">
                    <select className={this.state.stateValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                      onChange={() => this.handleFormChange(event)}
                      maxLength="2"
                      type="name"
                      name="state"
                      defaultValue="CA">
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-center form-group form-input">
                  <input className={this.state.creditCardValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                    onChange={() => this.handleFormChange(event)}
                    onBlur={field => this.handleValidation('creditCard')}
                    maxLength="16"
                    placeholder="Credit Card"
                    value={this.state.creditCard}
                    type="text"
                    name="creditCard"></input>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-center form-group col-6 form-input">
                    <input className={this.state.creditCardExpierationValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                      onChange={() => this.handleFormChange(event)}
                      onBlur={field => this.handleValidation('creditCardExpiration')}
                      placeholder="Expiration"
                      maxLength="7"
                      type="text"
                      value={this.state.creditCardExpiration}
                      name="creditCardExpiration"></input>
                  </div>
                  <div className="d-flex justify-content-center form-group col-6 form-input">
                    <input className={this.state.creditCardCVVValid ? 'error rounded checkout-input form-control' : 'rounded checkout-input form-control'}
                      onChange={() => this.handleFormChange(event)}
                      onBlur={field => this.handleValidation('creditCardCVV')}
                      placeholder="CVV"
                      maxLength="4"
                      type="text"
                      value={this.state.creditCardCVV}
                      name="creditCardCVV"></input>
                  </div>
                </div>
                <div className="form-group d-flex">
                  <input type="checkbox" className="m-2"
                    onChange={this.handleAcknowledgeChange} />
                  <label className="text-white">
                    You acknowledge that no personal or credit card information has been entered in the above fields.
                  </label>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary justify-content-end"
                    disabled={this.state.name === '' ||
                      this.state.creditCard === '' ||
                      this.state.shippingAddress === '' ||
                      this.state.acknowledge === false}>
                    Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
