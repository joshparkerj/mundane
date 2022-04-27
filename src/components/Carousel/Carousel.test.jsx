import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import '../../match-media.mock';

import Carousel from './Carousel';

it('Carousel component renders without crashing', () => {
  render(
    <Provider store={store}>
      <Carousel handleChange={() => { }} />
    </Provider>,
  );

  expect(true).toBe(true);
});
