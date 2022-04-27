import React from 'react';
import './comment-slide-in.scss';
import axios from 'axios';
import PropTypes from 'prop-types';

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
  open: PropTypes.bool.isRequired,
  taskID: PropTypes.string.isRequired,
  commentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateComment: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired,
  setTaskName: PropTypes.func.isRequired,
  closePanel: PropTypes.func.isRequired,
  updateTaskName: PropTypes.func.isRequired,
  commentText: PropTypes.string.isRequired,
  setCommentText: PropTypes.func.isRequired,
};

export default CommentSlideIn;
