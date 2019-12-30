import React from 'react';

export default function Footer(props) {
  return (
    <div>
      <div className="footer col-sm-12 bg-dark text-white d-flex justify-content-between">
        <div className="icon align-self-center"
          onClick={props.callback}
          style={{ cursor: 'pointer' }} />
        <div className="display-5 align-self-center ">
          <div className="fas fa-baseball-ball m-1 fa-2x "
            onClick={() => props.filter('Baseball')}
            style={{ cursor: 'pointer' }}></div>
          <div className="fas fa-basketball-ball m-1 fa-2x"
            onClick={() => props.filter('Basketball')}
            style={{ cursor: 'pointer' }}></div>
          <div className="fas fa-futbol m-1 fa-2x "
            onClick={() => props.filter('Soccer')}
            style={{ cursor: 'pointer' }}></div>
          {/* <div className="fas fa-warehouse m-1 fa-2x "></div> */}
        </div>
        <div className="display-5 align-self-center">
          <div className="fas fa-suitcase m-1 fa-2x "
            onClick={() => props.filter('Equipment')}
            style={{ cursor: 'pointer' }}></div>
        </div>
      </div>
    </div>
  );
}
