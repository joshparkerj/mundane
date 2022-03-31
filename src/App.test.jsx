import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import store from './redux/store';

import './match-media.mock';

import App from './App';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );

  expect(true).toBe(true);
});
