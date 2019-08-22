import React from 'react';
import consumer from 'channels/consumer';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      display: null,
    };
  }

  componentDidMount() {
    var component = this;
    this.subscription = consumer.subscriptions.create({ channel: "DisplayChannel" }, {
      connected() {
        console.log("Connected to display channel");
        component.setState({ connected: true });
        this.update();
      },

      update() {
        this.perform('request_state');
      },

      received(data) {
        console.log("New display details!");
        component.setState({ display: JSON.parse(data) });
      }
    });
  }

  render() {
    if (!this.state.connected) {
      return <div id="setup"><h1>Connecting</h1></div>;
    }

    if (!this.state.display) {
      return <div id="setup"><h1>Getting display details</h1></div>;
    }

    if (!this.state.display.name) {
      return(
        <div id="setup">
          <h1>Display {this.state.display.display_id}</h1>
          <p>This message will disappear once you set a name for the display, and a connection has been established with the control server.</p>
        </div>
      )
    }

    return <h1>This is {this.state.display.name}</h1>;
  }
}

export default Root;
