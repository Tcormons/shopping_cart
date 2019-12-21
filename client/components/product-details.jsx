import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      checkoutModal: false
    };
  }

  addToCart(product, operator) {
    this.toggleModal();
    this.props.addToCart(product, operator);
  }

  toggleModal() {
    this.setState({ checkoutModal: !this.state.checkoutModal });
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

      if (this.state.checkoutModal === false) {
        return (
          <div className='display-container'>
            <div className="container rounded col-11 my-3 p-3 bg-dark shadow">
              <div className='d-flex text-white'
                onClick={() => this.props.callback('catalog', {})}
                style={{ cursor: 'pointer' }}>
                <div className="fa fa-arrow-left py-2 fa-lg"></div>
                <h4 className="ml-1">Back to Catalog</h4>
              </div>
              <div className="products-details">
                <img className="rounded float-left m-2 img" src={product.image} />
                <div className="text-white my-3 ml-2">
                  <h4 className="title">{product.name}</h4>
                  <p className="text">{price}</p>
                  <p className="text">{product.shortDescription}</p>
                  <button className="btn btn-primary"
                    onClick={() => this.addToCart(this.state.product, '+')}>
                    Add to Cart</button>
                </div>
              </div>
              <div className='container col-md-12 my-2'>
                <p className="text-white">{product.longDescription}</p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <div className='background-modal'>
            <div className='intro-modal border border-light rounded shadow m-auto d-flex'>
              <div className='m-auto align-self-center text-center'>
                <div>Great! Let&apos;s get you out there playing!</div>
                <div className='d-flex justify-content-around m-auto'>
                  <button className="btn btn-secondary"
                    onClick={() => this.props.callback('catalog', {})}>Keep Shopping</button>
                  <button className="btn btn-info"
                    onClick={() => this.props.callback('cart', {})}>View Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className='display-container'>
            <div className="container rounded col-11 my-3 p-3 bg-dark shadow">
              <div className='d-flex text-white'
                onClick={() => this.props.callback('catalog', {})}
                style={{ cursor: 'pointer' }}>
                <div className="fa fa-arrow-left py-2 fa-lg"></div>
                <h4 className="ml-1">Back to Catalog</h4>
              </div>
              <div className="products-details">
                <img className="rounded float-left m-2 img" src={product.image} />
                <div className="text-white my-3 ml-2">
                  <h4 className="title">{product.name}</h4>
                  <p className="text">{price}</p>
                  <p className="text">{product.shortDescription}</p>
                  <button className="btn btn-primary"
                    onClick={() => this.addToCart(this.state.product, '+')}>
                    Add to Cart</button>
                </div>
              </div>
              <div className='container col-md-12 my-2'>
                <p className="text-white">{product.longDescription}</p>
              </div>
            </div>
          </div>
        </div>
      );

    }
    return null;
  }
}

export default ProductDetails;
