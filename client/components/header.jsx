import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div className="col-sm-12 sticky-top bg-dark text-white d-flex display-4">
        <div className="fa fa-dollar-sign m-1"></div>
        <div className="ml-2">Wicked Sales</div>
      </div>
    );
  }
}

export default Header;
