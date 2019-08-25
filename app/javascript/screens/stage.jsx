import React from 'react';
import ContentContainer from 'screens/content_container';

import Clock from 'widgets/clock';
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

var stageWidgets = [
  NowNextBar,
  MessagesBar,
];

class StageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWidget: 0
    };
  }

  rotate() {
    console.log("Done, next widget please");
    var nextWidget = this.state.currentWidget + 1;
    if (nextWidget == stageWidgets.length) {
      nextWidget = 0;
    }

    this.setState({ currentWidget: nextWidget });
  }

  render() {
    var BottomWidget = stageWidgets[this.state.currentWidget];
    console.log(BottomWidget)

    return (
      <div>
        <TopBar display={this.props.display} />
        <ContentContainer display={this.props.display} />
        <BottomWidget display={this.props.display} className='bottom-bar' onComplete={this.rotate.bind(this)} />
      </div>
    )
  }
}

export default StageScreen;
