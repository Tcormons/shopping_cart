import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div className="col-sm-12 sticky-top bg-dark text-white d-flex display-5">
        <div className="fa fa-dollar-sign m-1 fa-2x icon"></div>
        <h2 className="ml-1">Wicked Sales</h2>
      </div>
    );
  }
}

export default Header;
