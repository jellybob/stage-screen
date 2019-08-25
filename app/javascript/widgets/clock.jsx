import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: this.getCurrentTime() }
  }

  getCurrentTime() {
    var now = new Date();
    return now.toLocaleTimeString(undefined, { timeStyle: 'short' });
  }

  render() {
    return <div className={this.props.className}>{this.state.time}</div>;
  }
}

export default Clock;
