import React from 'react';

class MessagesBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: null }
  }

  componentDidMount() {
    this.loadMessage();
  }

  loadMessage() {
    var messageUrl = '/message';
    fetch('/message').
      then(response => response.json()).
      then(data => {
        this.setState({ 'message': data });
        this.props.onReady();
      });
  }

  render() {
    var message = this.state.message;
    if (message == null) {
      return null;
    }

    return (
      <React.Fragment>
        <h1>{ message.headline }</h1>
        <p>{ message.body }</p>
      </React.Fragment>
    );
  }
}

export default MessagesBar;
