import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './Components/App';

// Put anything that needs to be declared before the main App here
const ParentApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default ParentApp;
