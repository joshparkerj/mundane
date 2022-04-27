import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import '../../match-media.mock';

import DashSideNav from './DashSideNav';

/*
dashboard: PropTypes.shape({
    boards: PropTypes.arrayOf(PropTypes.shape({
      private: PropTypes.bool,
      name: PropTypes.string,
      id: PropTypes.string,
    })),
*/

it('DashSideNav component renders without crashing', () => {
  render(
    <Provider store={store}>
      <DashSideNav
        changeViews={() => { }}
        count={108}
        dashboard={{
          boards: [
            {
              private: false,
              name: 'board 43',
              id: '43',
            },
            {
              private: true,
              name: 'board 51',
              id: '51',
            },
          ],
        }}
      />
    </Provider>,
  );

  expect(true).toBe(true);
});
