import React from 'react';
import Header from './header';
import Banner from './banner';
import Footer from './footer';
import Modal from './modal';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import Checkout from './checkout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'intro', params: {} },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.cartCheckout = this.cartCheckout.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.viewOrder = this.viewOrder.bind(this);
    this.setCatalogView = this.setCatalogView.bind(this);
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
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItemid: product.id })
    };

    fetch('/api/cart', req)
      .then(response => this.getCartItems())
      .catch(error => console.error('There was an error in your request', error));
  }

  addToCart(product, operator) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.productId, operator: operator })
    };
    fetch('/api/cart', req)
      .then(response => response.json())
      .then(data => {
        this.setState();
        this.getCartItems();
      });
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

  setCatalogView() {
    this.setState({ view: { name: 'catalog', params: {} } });
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
    if (this.state.view.name === 'intro') {
      return (
        <div>
          <Header
            itemCount={this.state.cart}
            callback={this.setCatalogView} />
          <Banner />
          <Modal callback={this.setCatalogView} />
          <ProductList />
          <Footer
            callback={this.setCatalogView} />
        </div>
      );
    }

    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header
            itemCount={this.state.cart}
            checkout={this.cartCheckout}
            callback={this.setCatalogView} />
          <Banner />
          <ProductList callback={this.setView} />
          <Footer
            callback={this.setCatalogView} />
        </div>
      );
    }

    if (this.state.view.name === 'details') {
      return (
        <div>
          <Header
            callback={this.setCatalogView}
            itemCount={this.state.cart}
            checkout={this.cartCheckout} />
          <ProductDetails
            params={this.state.view.params}
            callback={this.setView}
            addToCart={this.addToCart}/>
          <Footer
            callback={this.setCatalogView}/>
        </div>
      );
    }
    if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header
            callback={this.setCatalogView}
            itemCount={this.state.cart}
            checkout={this.cartCheckout} />
          <CartSummary
            cart={this.state.cart}
            callback={this.setView}
            removeCallback={this.removeFromCart}
            quantityCallback={this.addToCart}
            viewOrder={this.viewOrder} />
          <Footer
            callback={this.setCatalogView} />
        </div>
      );
    }
    if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header
            callback={this.setCatalogView}
            itemCount={this.state.cart}
            checkout={this.cartCheckout} />
          <Checkout
            cart={this.state.cart}
            callback={this.setView}
            submitCallback={this.placeOrder} />
          <Footer
            callback={this.setCatalogView} />
        </div>
      );
    }

  }
}

export default App;
