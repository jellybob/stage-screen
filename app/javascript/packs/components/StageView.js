import React, { useState, useEffect } from 'react';
import Toaster from './Toaster';
import socket from '../websocket.js';
import './StageView.scss';

function StageView() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    socket.subscriptions.create({ channel: 'NewsChannel' }, {
      received(data) {
        let payload = JSON.parse(data);
        console.log("Received new news:", payload);
        setNews(payload);
      }
    });
  }, []);

  function renderItem(item, idx) {
    return (
      <div key={item.id} className="news-item">
        <h1>{item.headline}</h1>
        { item.body &&
          <p>{item.body}</p>
        }
      </div>
    );
  }

  return (
    <div className="view view-stage">
      <Toaster position="bottom" displayTime={1000} downTime={5000}>
        {news.map(item => renderItem(item))}
      </Toaster>
    </div>
  );
}

export default StageView;
