import React from 'react';
import './SetupView.scss';

function SetupView(props) {
  if (props.setup_key) {
    return (
      <div className="view view-setup">
        <h1>This is display {props.setup_key}</h1>
        <p>Go to https://bit.ly/emf-display-setup to configure it</p>

        <div className="config">
          <h2>Configuration</h2>
          <p><strong>Name:</strong> {props.name}</p>
          <p><strong>Location:</strong> {props.location}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="view view-setup">
        <h1>Connecting to server...</h1>
      </div>
    )
  }
}

export default SetupView;
