import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const itemCount = this.props.itemCount.reduce((acc, item) => acc + item.quantity, 0);
    const item = itemCount === 1 ? 'Item' : 'Items';

    return (
      <div>
        <div className="header col-12 fixed-top bg-dark text-white shadow d-flex justify-content-between p-2">
          <div className="icon align-self-center"
            onClick={this.props.callback}
            style={{ cursor: 'pointer' }}></div>
          <h1 className="banner-title align-self-center"
            onClick={this.props.callback}
            style={{ cursor: 'pointer' }}>Athletix Gear</h1>
          <div className="d-flex align-self-center"
            onClick={this.props.checkout}
            style={{ cursor: 'pointer' }}>
            <h6 className="align-self-center"
              style={{ cursor: 'pointer' }}>{itemCount} {item}</h6>
            <div className="fa fa-shopping-cart fa-lg align-self-center"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
