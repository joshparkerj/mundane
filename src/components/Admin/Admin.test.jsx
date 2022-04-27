import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../redux/store';

import '../../match-media.mock';

import Admin from './Admin';

it('Admin component renders without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <Admin />
      </Router>
    </Provider>,
  );

  expect(true).toBe(true);
});
