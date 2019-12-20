import React from 'react';

export default function Modal(props) {
  return (
    <div>
      <div className='background-modal'>
        <div className='intro-modal border border-light rounded shadow m-auto d-flex'>
          <div className='m-auto align-self-center text-center'>
            <div>This is a demo site <br /> * None of your transactions will be processed * </div>
            <button className="btn btn-primary mt-2"
              onClick={props.callback}>Acknowledge</button>
          </div>
        </div>
      </div>
    </div>
  );
}
