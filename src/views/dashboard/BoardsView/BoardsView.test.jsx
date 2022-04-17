import React from 'react';

import { render } from '@testing-library/react';

import '../../../match-media.mock';

import BoardsView from './BoardsView';

it('boards view renders without crashing', () => {
  render(
    <BoardsView />,
  );

  expect(true).toBe(true);
});
