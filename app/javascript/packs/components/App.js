import React, { useState, useEffect } from 'react';
import StageView from './StageView.js';

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

  let MainView = views[config.view];

  return <MainView {...config} />;
}

export default App;
