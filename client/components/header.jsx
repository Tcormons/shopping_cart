import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="header col-12 sticky-top bg-dark text-white shadow d-flex justify-content-between">
          <div className="icon align-self-center"
            onClick={this.props.callback}
            style={{ cursor: 'pointer' }}></div>
          <h1 className="banner-title align-self-center"
            onClick={this.props.checkout}
            style={{ cursor: 'pointer' }}>Local Sports</h1>
          <div className="d-flex align-self-center"
            onClick={this.props.checkout}
            style={{ cursor: 'pointer' }}>
            <h6 className="align-self-center"
              style={{ cursor: 'pointer' }}>{this.props.itemCount.reduce((acc, item) => { return acc + item.quantity; }, 0)} Items</h6>
            <div className="fa fa-shopping-cart fa-lg align-self-center"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
