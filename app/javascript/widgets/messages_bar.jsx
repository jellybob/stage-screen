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
    this.next();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  next() {
    var messageUrl = '/message';
    fetch('/message').
      then(response => response.json()).
      then(data => {
        this.setState({ 'message': data });
        this.timeout = setTimeout(this.display.bind(this), 30000);
      });
  }

  hide() {
    this.timeout = setTimeout(this.next.bind(this), 10000);
    this.setState({ visible: false });
  }

  display() {
    this.timeout = setTimeout(this.hide.bind(this), 45000);
    this.setState({ visible: true });
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
