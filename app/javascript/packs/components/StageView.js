import React, { useState, useEffect } from 'react';
import Toaster from './Toaster';
import socket from '../websocket.js';
import './StageView.scss';

function StageView(props) {
  const [news, setNews] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    socket.subscriptions.create({ channel: 'NewsChannel' }, {
      received(data) {
        let payload = JSON.parse(data);
        console.log("Received new news:", payload);
        setNews(payload);
      }
    });
  }, []);

  useEffect(() => {
    let subscription = socket.subscriptions.create({ channel: 'ScheduleChannel', location: props.location }, {
      received(data) {
        let payload = JSON.parse(data);
        console.log("Received new schedule items:", payload);
        setSchedule(payload.map(event => {
          event["starts_at"] = new Date(event["starts_at"])
          event["ends_at"] = new Date(event["ends_at"])

          return event;
        }));
      }
    })

    return () => { subscription.unsubscribe(); }
  }, [props.location])

  function currentSchedule() {
    return schedule.filter(event => event.ends_at >= new Date()).slice(0,3);
  }

  function renderItems() {
    var items = [];
    var i = 0;

    news.forEach(item => {
      items.push(renderNewsItem(item));
      items.push(renderSchedule(i));
      i++;
    });

    return items;
  }

  function renderNewsItem(item) {
    return (
      <div key={`news-${item.id}`} className="news-item">
        <h1>{item.headline}</h1>
        { item.body &&
          <p>{item.body}</p>
        }
      </div>
    );
  }

  function renderSchedule(i) {
    return (
      <div key={`schedule-${i}`} className="news-item">
        <h1>Coming Up</h1>
        {currentSchedule().map(event => renderEvent(event))}
      </div>
    );
  }

  function renderEvent(event) {
    return (
      <div className="event" key={`event-${event.id}`}>
        <div className="event-start-time">{event.starts_at.getHours()}:{event.starts_at.getMinutes()}</div>
        <div>
          <div className="event-title">{event.title}</div>
          <div className="event-speaker">{event.speaker}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="view view-stage">
      <Toaster position="bottom" displayTime={5000} downTime={5000}>
        {renderItems()}
      </Toaster>
    </div>
  );
}

export default StageView;
