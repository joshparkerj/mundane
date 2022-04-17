import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

import '../../../match-media.mock';

import NewRegisterView from './NewRegisterView';

it('new register view renders without crashing', () => {
  render(
    <Provider store={store}>
      <NewRegisterView />
    </Provider>,
  );

  expect(true).toBe(true);
});
