import React from 'react';
import axios from 'axios';
import {
  bool, string, arrayOf, shape, func, number,
} from 'prop-types';

import './comment-slide-in.scss';

const CommentSlideIn = function CommentsSlideIn({
  open,
  taskID,
  commentList,
  updateComment,
  taskName,
  setTaskName,
  closePanel,
  updateTaskName,
  commentText,
  setCommentText,
}) {
  const handleCloseComments = () => {
    closePanel();
  };

  const addComment = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      setCommentText('');
      axios.post('/api/comment', { taskID, content: value })
        .then((response) => {
          updateComment(response.data);
        });
    }
  };

  const taskCommentList = commentList.map((task) => (
    <div
      key={task.id}
      className="comment-container"
    >
      <div className="inner-comment">
        <div className="comment-info">
          <div className="name-pic">
            <div
              id="pic"
              style={{
                backgroundColor: '#fb275d',
                height: '25px',
                width: '25px',
                borderRadius: '50%',
                backgroundImage: `url(${task.author_pic})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {task.author}
          </div>
          <div>{task.time_posted}</div>
        </div>
        <div className="content">
          {task.content}
        </div>
      </div>
    </div>
  ));
  return (
    <div
      className="slide-in-container"
      style={{
        transform: open ? 'translateX(0px)' : 'translateX(555px)',
      }}
    >
      <div className="content-container">
        <button
          type="button"
          id="close-button"
          onClick={handleCloseComments}
        >
          X
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault(); updateTaskName();
          }}
        >
          <input
            className="title-input"
            type="text"
            placeholder={taskName}
            name="taskName"
            onChange={({ target }) => setTaskName(target.value)}

          />
        </form>
        <div className="divider" />
        <form>
          <textarea
            className="comment"
            placeholder="Write an update..."
            name="commentText"
            value={commentText}
            onChange={({ target }) => setCommentText(target.value)}
            onKeyDown={addComment}
          />
        </form>
        {taskCommentList}
      </div>
    </div>

  );
};

CommentSlideIn.propTypes = {
  open: bool.isRequired,
  taskID: number.isRequired,
  commentList: arrayOf(shape({
    id: string,
    text: string,
  })).isRequired,
  updateComment: func.isRequired,
  taskName: string.isRequired,
  setTaskName: func.isRequired,
  closePanel: func.isRequired,
  updateTaskName: func.isRequired,
  commentText: string.isRequired,
  setCommentText: func.isRequired,
};

export default CommentSlideIn;
