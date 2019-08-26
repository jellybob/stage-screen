import React from 'react';
import ContentContainer from 'screens/content_container';

import Clock from 'widgets/clock';
import InfoBar from 'widgets/info_bar'
import MessagesBar from 'widgets/messages_bar';
import NowNextBar from 'widgets/now_next_bar';

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
  constructor(props) {
    super(props);

    this.widgets = [NowNextBar, MessagesBar];
  }

  render() {
    return (
      <div>
        <TopBar display={this.props.display} />
        <ContentContainer display={this.props.display} />
        <InfoBar widgets={this.widgets} display={this.props.display} />
      </div>
    )
  }
}

export default StageScreen;
