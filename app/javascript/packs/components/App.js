import React, { useState, useEffect } from 'react';
import StageView from './StageView.js';
import SetupView from './SetupView.js';
import socket from '../websocket.js';

function App() {
  const initialState = {
    "id": "unknown",
    "name": "unknown",
    "location": "unknown",
    "view": "setup",
  };

  const views = {
    "stage": StageView,
    "setup": SetupView,
  };

  const [config, setConfig] = useState(loadConfig());

  // Make sure at least the basics come back in the correct state as soon
  // as a display is reloaded to stop a brief flash of connecting screen.
  function persistConfig(data) {
    localStorage.setItem("config", data)
  }

  function loadConfig() {
    let persistedConfig = localStorage.getItem("config");
    if (persistedConfig === null) {
      return initialState;
    } else {
      return JSON.parse(persistedConfig);
    }
  }

  useEffect(() => {
    socket.subscriptions.create({ channel: 'DeviceChannel' }, {
      received(data) {
        let payload = JSON.parse(data);
        persistConfig(data);

        console.log("Received device update:", payload);
        setConfig(payload);
      }
    });

    socket.subscriptions.create({ channel: 'CommandChannel' }, {
      received(data) {
        let payload = JSON.parse(data);

        switch(payload.command) {
          case "reload":
            console.log("Reloading due to server request");
            document.location.href = document.location.href;
            break;
        }
      }
    });
  }, []);

  let MainView = views[config.view];

  return <MainView {...config} />;
}

export default App;
