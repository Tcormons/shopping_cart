import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredList: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(data => data.json())
      .then(response => this.setState({
        products: response.message,
        filteredList: response.message
      }))
      .catch(error => console.error('Error: ', error));
  }

  componentDidUpdate(prevProps) {
    if (this.props.filterView !== prevProps.filterView) {
      this.setState({
        filteredList: this.state.products.filter(product => product.category === this.props.filterView)
      });
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  render(props) {
    if (this.state.filteredList.length !== 0) {
      return (
        <div className='container-fluid col-md-11'>
          <div className='row justify-content-around'>
            {this.state.filteredList.map((product, index) => (
              <ProductListItem
                key={index}
                product={product}
                callback={this.props.callback} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className='container-fluid col-md-11'>
        <div className='row justify-content-around'>
          {this.state.products.map((product, index) => (
            <ProductListItem
              key={index}
              product={product}
              callback={this.props.callback} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
