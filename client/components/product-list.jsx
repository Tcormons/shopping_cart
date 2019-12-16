import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(data => data.json())
      .then(response => this.setState({
        products: response.message
      }))
      .catch(error => console.error('Error: ', error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render(props) {
    return (
      <div className='container-fluid col-md-11'>
        <div className='row'>
          {this.state.products.map((product, index) => (
            <ProductListItem
              key={index}
              product={product}
              callback={this.props.callback}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
