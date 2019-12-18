import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="header col-sm-12 sticky-top bg-dark text-white shadow d-flex justify-content-between">
          <div className="d-flex display-5 align-self-center">
            <div className="fas fa-globe m-1 fa-2x icon align-self-center"></div>
            <h1 className="banner-title ml-1 mt-1">Local Sports</h1>
          </div>
          <div className="d-flex align-self-center"
            onClick={this.props.checkout}
            style={{ cursor: 'pointer' }}>
            <h6 className="mt-3">{this.props.itemCount} Items</h6>
            <div className="fa fa-shopping-cart ml-2 mt-3 fa-lg icon"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
