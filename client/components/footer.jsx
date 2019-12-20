import React from 'react';

export default function Footer(props) {
  return (
    <div>
      <div className="footer col-sm-12 bg-dark text-white d-flex justify-content-around">
        <div className="icon align-self-center"
          onClick={props.callback}
          style={{ cursor: 'pointer' }}/>
        <div className="display-5 align-self-center ">
          <div className="fas fa-baseball-ball m-1 fa-2x "></div>
          <div className="fas fa-basketball-ball m-1 fa-2x "></div>
          <div className="fas fa-bowling-ball m-1 fa-2x "></div>
          <div className="fas fa-football-ball m-1 fa-2x "></div>
          <div className="fas fa-futbol m-1 fa-2x "></div>
          <div className="fas fa-golf-ball m-1 fa-2x "></div>
        </div>
      </div>
    </div>
  );
}
