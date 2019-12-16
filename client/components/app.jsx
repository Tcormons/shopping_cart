import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import Checkout from './checkout';

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
    this.placeOrder = this.placeOrder.bind(this);
    this.viewOrder = this.viewOrder.bind(this);
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

  removeFromCart(product) {
    const newCart = (this.state.cart.filter(item => item.id !== product.id));
    this.setState({
      cart: newCart
    });
  }

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

  viewOrder() {
    this.setState({
      view: { name: 'checkout', params: {} }
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
        view: { name: 'catalog', params: {} },
        cart: []
      }))
      .catch(error => console.error('Error', error));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}
            checkout={this.cartCheckout} />
          <ProductList callback={this.setView} />
        </div>
      );
    }

    if (this.state.view.name === 'details') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}
            checkout={this.cartCheckout} />
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
            removeCallback={this.removeFromCart}
            viewOrder={this.viewOrder}/>
        </div>
      );
    }
    if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}
            checkout={this.cartCheckout} />
          <Checkout cart={this.state.cart}
            callback={this.setView}
            submitCallback={this.placeOrder}/>
        </div>
      );
    }

  }
}

export default App;
