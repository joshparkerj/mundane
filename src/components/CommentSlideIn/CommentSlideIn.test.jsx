import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import '../../match-media.mock';

import CommentSlideIn from './CommentSlideIn';

it('CommentSlideIn component renders without crashing', () => {
  render(
    <Provider store={store}>
      <CommentSlideIn
        open={false}
        taskID={0}
        commentList={[{ id: '2', text: 'hey' }, { id: '22', text: 'hey' }]}
        updateComment={() => { }}
        taskName="Alejandro"
        setTaskName={() => { }}
        closePanel={() => { }}
        updateTaskName={() => { }}
        commentText="hey hey hey"
        setCommentText={() => { }}
      />
    </Provider>,
  );

  expect(true).toBe(true);
});
