import App from './components/App'
import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default WrappedApp;
