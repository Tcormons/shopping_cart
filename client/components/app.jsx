import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
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

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}/>
          <ProductList callback={this.setView} />
        </div>
      );
    }

    if (this.state.view.name === 'details') {
      return (
        <div>
          <Header itemCount={this.state.cart.length}/>
          <ProductDetails
            params={this.state.view.params}
            callback={this.setView}
            addToCart={this.addToCart}
          />
        </div>
      );
    }

  }
}

export default App;
