import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/*eslint-disable */
console.dir(process.env.NODE_ENV);
console.dir(process.env.SF_USERNAME);
//console.dir(process.env.SF_PASSWORD);
console.dir(process.env.SF_URL);
console.dir(window['__ACCESS_TOKEN']);
/*eslint-enable */

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default WrappedApp;
