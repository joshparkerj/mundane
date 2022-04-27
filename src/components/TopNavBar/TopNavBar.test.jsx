import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import '../../match-media.mock';

import TopNavBar from './TopNavBar';

it('TopNavBar component renders without crashing', () => {
  render(
    <Provider store={store}>
      <TopNavBar
        page={() => { }}
        user={{ pic: 'very nice pic' }}
        logout={() => { }}
      />
    </Provider>,
  );

  expect(true).toBe(true);
});
