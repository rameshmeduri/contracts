import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Contract from './components/Contract';
import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="container">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">AppName</a>
      </nav>
      <Contract />
    </div>
  </Provider>
);

export default App;
