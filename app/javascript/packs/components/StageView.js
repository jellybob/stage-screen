import React, { useState, useEffect } from 'react';
import Toaster from './Toaster';
import socket from '../websocket.js';
import './StageView.scss';

function StageView() {
  const [news, setNews] = useState([]);
  const [initialised, setInitialised] = useState(false);

  function updateNews() {
    console.info('StageView: Fetching news');
    fetch('/news')
      .then((r) => r.json())
      .then(data => {
        setNews(data);
      });
  }

  useEffect(() => {
    let timeout = null;

    socket.subscriptions.create({ channel: 'NewsChannel' }, {
      received(data) {
        // Add a slight delay to requesting new news so all displays
        // don't hit the backend at the same time.
        let jitter = Math.floor(Math.random(500));

        timeout = setTimeout(updateNews, jitter);
      }
    });

    if (!initialised) {
      updateNews();
      setInitialised(true);
    }

    return () => {
      if (timeout !== null) { clearTimeout(null); }
    }
  }, []);

  function renderItem(item, idx) {
    return (
      <div key={idx} className="news-item">
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
        {news.map((item, idx) => renderItem(item, idx))}
      </Toaster>
    </div>
  );
}

export default StageView;
