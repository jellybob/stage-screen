import React from 'react';
import ContentContainer from 'screens/content_container';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: this.getCurrentTime() }
  }

  getCurrentTime() {
    var now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`
  }

  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-location">{this.props.display.location}</div>
        <div className="top-bar-time">{this.state.time}</div>
      </div>
    );
  }
}

class MessagesBar extends React.Component {
  render() { return <div className="bottom-bar" /> }
}

class StageScreen extends React.Component {
  render() {
    return (
      <div>
        <TopBar display={this.props.display} />
        <ContentContainer display={this.props.display} />
        <MessagesBar display={this.props.display} />
      </div>
    )
  }
}

export default StageScreen;
