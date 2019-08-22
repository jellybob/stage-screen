import React from 'react';

class SetupScreen extends React.Component {
  render() {
    var display = this.props.display;
    if (!display) { <h1>Connecting...</h1> }

    return (
      <div>
        <h1>{display.name}</h1>
        <h2>Device ID: {display.display_id}</h2>
        <h2>Location: {display.location}</h2>
      </div>
    );
  }
}

export default SetupScreen;
