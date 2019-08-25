import React from 'react';

class MessagesBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      visible: false,
    }
  }

  componentDidMount() {
    this.loadMessage();
  }

  componentWillUnmount() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  loadMessage() {
    var messageUrl = '/message';
    fetch('/message').
      then(response => response.json()).
      then(data => {
        this.setState({ 'message': data, 'visible': true });
        this.timeout = setTimeout(this.hide.bind(this), 45000);
      });
  }

  hide() {
    this.timeout = setTimeout(this.props.onComplete, 10000);
    this.setState({ visible: false });
  }

  render() {
    var message = this.state.message;
    if (message == null) {
      return null;
    }

    var classes = [this.props.className];
    if (!this.state.visible) {
      classes.push('hidden');
    }

    return (
      <div className={ classes.join(' ') }>
        <h1>{ message.headline }</h1>
        <p>{ message.body }</p>
      </div>
    );
  }
}

export default MessagesBar;
