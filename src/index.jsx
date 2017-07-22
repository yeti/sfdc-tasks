import './entry.js';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from 'app';
import { VERSION, RELEASE } from 'APP_CONFIG';

// this file "kicks off" the application.
// it's where we define where our application will hook into DOM
// and what should be used as the root component

const renderApp = (Component) => {
  ReactDOM.render(
    (<AppContainer>
      <Component />
    </AppContainer>),
    document.getElementById('app')
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextRoot = require('./app').default;
    renderApp(NextRoot);
  });
}

window['__APP_INFO'] = { VERSION, RELEASE };
