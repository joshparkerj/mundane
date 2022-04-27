import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import '../../match-media.mock';

import Boards from './Boards';

it('Boards component renders without crashing', () => {
  render(
    <Provider store={store}>
      <Boards board_id={43} board_name="board 43" />
    </Provider>,
  );

  expect(true).toBe(true);
});
