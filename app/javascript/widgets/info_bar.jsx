import React from 'react';

class InfoBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWidget: 0,
      visible: false,
    };
  }

  ready() {
    this.setState({ visible: true });
    this.timeout = setTimeout(this.done.bind(this), 45000);
  }

  done() {
    this.setState({ visible: false });
    this.timeout = setTimeout(this.rotate.bind(this), 30000);
  }

  rotate() {
    var nextWidget = this.state.currentWidget + 1;
    if (nextWidget == this.props.widgets.length) {
      nextWidget = 0;
    }

    this.setState({ currentWidget: nextWidget });
  }

  render() {
    var Widget = this.props.widgets[this.state.currentWidget];
    var classNames = ['bottom-bar'];
    if (!this.state.visible) {
      classNames.push('hidden');
    }

    classNames = classNames.join(' ');

    return (
      <div className={classNames}>
        <Widget
          display={this.props.display}
          onReady={this.ready.bind(this)} />
      </div>
    );
  }
}

export default InfoBar;

