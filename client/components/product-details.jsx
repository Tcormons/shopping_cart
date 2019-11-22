import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const Id = this.props.params.productId;
    fetch(`/api/products?productId=${Id}`)
      .then(data => data.json())
      .then(response => this.setState({
        product: response.message
      }))
      .catch(error => console.error('Error: ', error));
  }

  render() {
    const product = this.state.product;

    if (product) {
      const price = `$${(product.price / 100).toFixed(2)}`;

      return (
        <div className="container rounded col-11 my-5 p-3 bg-dark shadow">
          <div className='d-flex text-white'
            onClick={() => this.props.callback('catalog', {})}
            style={{ cursor: 'pointer' }}
          >
            <div className="fa fa-arrow-left py-2 fa-lg icon"></div>
            <h4 className="ml-1">Back to Catalog</h4>
          </div>
          <div className="d-flex">
            <img className="rounded float-left m-2 img" src={product.image} />
            <div className="text-white my-3 ml-2">
              <h4 className="title">{product.name}</h4>
              <p className="text">{price}</p>
              <p className="text">{product.shortDescription}</p>
              <button className="btn btn-primary"
                onClick={() => this.props.addToCart(this.state.product)}>
                Add to Cart</button>
            </div>
          </div>
          <div className='container col-md-12 my-2'>
            <p className="text-white">{product.longDescription}</p>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default ProductDetails;
