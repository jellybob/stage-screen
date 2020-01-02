import React, { useState, useEffect } from 'react';
import StageView from './StageView.js';
import socket from '../websocket.js';

function App() {
  const initialState = {
    "id": "unknown",
    "name": "unknown",
    "location": "unknown",
    "view": "stage",
  };

  const views = {
    "stage": StageView,
  };

  const [config, setConfig] = useState(initialState);

  useEffect(() => {
    socket.subscriptions.create({ channel: 'DeviceChannel' }, {
      received(data) {
        let payload = JSON.parse(data);
        console.log("Received device update:", payload);
        setConfig(payload);
      }
    });
  }, []);

  let MainView = views[config.view];

  return <MainView {...config} />;
}

export default App;
