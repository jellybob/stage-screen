import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'root';

window.addEventListener('DOMContentLoaded', (event) => {
  var container = document.getElementById('container');
  console.log(container);

  ReactDOM.render(
    <Root />,
    document.getElementById('container')
  );
});
