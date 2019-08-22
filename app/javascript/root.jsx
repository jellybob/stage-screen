import React from 'react';
import consumer from 'channels/consumer';

import SetupScreen from 'screens/setup';
import StageScreen from 'screens/stage';
import BarScreen from 'screens/bar';
import InfoScreen from 'screens/info';

var viewComponents = {
  'setup': SetupScreen,
  'stage': StageScreen,
  'bar': BarScreen,
  'info': InfoScreen,
};


class DisplayStatus extends React.Component {
  render() {
    var connected = this.props.connected;
    var display = this.props.display;

    if (!connected) {
      return <div id="setup"><h1>Connecting</h1></div>;
    }

    if (!display) {
      return <div id="setup"><h1>Getting display details</h1></div>;
    }

    return (
      <div id="setup">
        <h1>This is display {display.display_id} ({display.name})</h1>
      </div>
    )
  }
}

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

      disconnected() {
        component.setState({ connected: false });
      },

      update() {
        this.perform('request_state');
      },

      received(data) {
        console.log("New display details!", JSON.parse(data));
        component.setState({ display: JSON.parse(data) });
      }
    });
  }

  renderContent() {
    if (!this.state.display) {
      return null;
    }

    var mode = this.state.display.view_mode || 'setup';
    var ViewComponent = viewComponents[mode] || SetupScreen;

    return <ViewComponent display={this.state.display} connected={this.state.connected} />;
  }

  renderStatus() {
    if (this.state.display && this.state.display.show_status) {
      return <DisplayStatus display={this.state.display} connected={this.state.connected} />;
    }
  }

  render() {
    return (
      <div>
        {this.renderStatus()}
        {this.renderContent()}
      </div>
    );
  }
}

export default Root;
