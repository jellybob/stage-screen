import React from 'react';

class NowNextBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { schedule: null }
  }

  componentDidMount() {
    this.loadScheduleForLocation(this.props.display.location);
  }

  loadScheduleForLocation(location) {
    fetch(`/schedule/${this.props.display.location}`).
      then(response => response.json()).
      then(data => {
        console.log(data);
        this.setState({ 'events': data });
        this.props.onReady();
      });
  }

  renderEvents(events) {
    return this.state.events.map(event => {
      return(
        <h2 key={ `event-${event.id}` }>
          <span className="event-time">{event.start_time}</span>
          {event.speaker} - {event.title}
        </h2>
      );
    });
  }

  render() {
    var events = this.state.events;
    if (!events) { return null; }

    return (
      <React.Fragment>
        <h1>At This Venue</h1>
        { this.renderEvents(events) }
      </React.Fragment>
    );
  }
}

export default NowNextBar;
