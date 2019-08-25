import React from 'react';

class NowNextBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: null,
      visible: false,
    }
  }

  componentDidMount() {
    this.loadScheduleForLocation(this.props.display.location);
  }

  componentWillUnmount() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }

  loadScheduleForLocation(location) {
    var messageUrl = '/message';
    fetch(`/schedule/${this.props.display.location}`).
      then(response => response.json()).
      then(data => {
        console.log(data);
        this.setState({ 'events': data, 'visible': true });
        this.timeout = setTimeout(this.hide.bind(this), 45000);
      });
  }

  hide() {
    this.timeout = setTimeout(this.props.onComplete, 10000);
    this.setState({ visible: false });
  }

  renderEvents(events) {
    return this.state.events.map(event => {
      return(
        <h2>
          <span class="event-time">{event.start_time}</span>
          {event.speaker} - {event.title}
        </h2>
      );
    });
  }

  render() {
    var events = this.state.events;
    var classes = [this.props.className];
    if (!this.state.visible) {
      classes.push('hidden');
    }

    if (events == null) {
      return <div className={ classes.join(' ') } />;
    }


    return (
      <div className={ classes.join(' ') }>
        <h1>At This Venue</h1>
        { this.renderEvents(events) }
      </div>
    );
  }
}

export default NowNextBar;
