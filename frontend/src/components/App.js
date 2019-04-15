import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Contract from './Contract';
import LineChartDemo from './LineChart';


const App = () => (
  <Provider store={store}>
    <div className="container">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">AppName</a>
      </nav>
      <Contract />
      <LineChartDemo />
    </div>
  </Provider>
);

export default App;
