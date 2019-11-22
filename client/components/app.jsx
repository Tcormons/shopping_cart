import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.cartCheckout = this.cartCheckout.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name, params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => this.setState({
        cart: data
      }));
  }

  // removeFromCart(product) {
  // }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };

    fetch('/api/cart', req)
      .then(response => response.json())
      .then(data => this.setState({
        cart: this.state.cart.concat(data)
      }));
  }

  cartCheckout() {
    this.setState({
      view: { name: 'cart', params: {} }
    });
  }

  placeOrder(cart) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    };

    fetch('/api/orders', req)
      .then(response => response.json())
      .then(data => this.setState({
        cart: []
      }));

  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}
            checkout={this.cartCheckout}/>
          <ProductList callback={this.setView} />
        </div>
      );
    }

    if (this.state.view.name === 'details') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}
            checkout={this.cartCheckout}/>
          <ProductDetails
            params={this.state.view.params}
            callback={this.setView}
            addToCart={this.addToCart}
          />
        </div>
      );
    }
    if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}
            checkout={this.cartCheckout} />
          <CartSummary cart={this.state.cart}
            callback={this.setView}
            removeCallback={this.removeFromCart}/>
        </div>
      );
    }

  }
}

export default App;
