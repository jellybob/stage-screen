import React from 'react';
import ContentContainer from 'screens/content_container';

class TopBar extends React.Component {
  render() { return <div className="top-bar" /> }
}

class MessagesBar extends React.Component {
  render() { return <div className="bottom-bar" /> }
}

class StageScreen extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <ContentContainer />
        <MessagesBar />
      </div>
    )
  }
}

export default StageScreen;
