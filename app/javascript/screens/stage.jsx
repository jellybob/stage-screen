import React from 'react';
import ContentContainer from 'screens/content_container';

import Clock from 'widgets/clock';
import MessagesBar from 'widgets/messages_bar';

class TopBar extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <img src="/logo.png" id="logo" />
        <div className="top-bar-location">{this.props.display.location}</div>
        <Clock className="top-bar-time" />
      </div>
    );
  }
}

class StageScreen extends React.Component {
  render() {
    return (
      <div>
        <TopBar display={this.props.display} />
        <ContentContainer display={this.props.display} />
        <MessagesBar display={this.props.display} className='bottom-bar' />
      </div>
    )
  }
}

export default StageScreen;
