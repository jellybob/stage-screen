import React from 'react';

class TopBar extends React.Component {
  render() { return <div className="top-bar" /> }
}

class MessagesBar extends React.Component {
  render() { return <div className="bottom-bar" /> }
}

class ContentContainer extends React.Component {
  render() { return <div className="content" /> }
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
