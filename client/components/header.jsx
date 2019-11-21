import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col-sm-12 sticky-top bg-dark text-white d-flex justify-content-between">
        <div className="d-flex display-5">
          <div className="fa fa-dollar-sign m-1 fa-2x icon"></div>
          <h2 className="ml-1">Wicked Sales</h2>
        </div>
        <div className="d-flex">
          <h6 className="mt-3">{this.props.itemCount} Items</h6>
          <div className="fa fa-shopping-cart ml-2 mt-3 fa-lg icon"></div>
        </div>
      </div>

    );
  }
}

export default Header;
