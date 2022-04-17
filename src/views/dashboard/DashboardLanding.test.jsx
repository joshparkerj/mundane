import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import '../../match-media.mock';

import DashboardLanding from './DashboardLanding';

it.skip('dashboard landing renders without crashing', () => {
  render(
    <Provider store={store}>
      <DashboardLanding />
    </Provider>,
  );

  expect(true).toBe(true);
});
