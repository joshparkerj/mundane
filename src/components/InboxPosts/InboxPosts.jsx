import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './inboxPosts.scss';

const InboxPosts = function InboxPosts({
  author, authorPic, boardName, content, taskName, readCount, commentRead, readFunction, commentID,
}) {
  const markAsRead = () => {
    axios.post('/api/comment/read', { commentID })
      .then(() => readFunction(commentID));
  };

  const markAsUnread = () => {
    axios.post('/api/comment/unread', { commentID })
      .then(() => readFunction(commentID));
  };

  const toggleReadClick = () => {
    if (commentRead) {
      markAsUnread();
    } else {
      markAsRead();
    }
  };

  return (
    <div className="post-container">
      <div>
        <div className="post-header">
          <div className="post-title">
            <a href="profile_info">
              <img className="profile-pic" src={authorPic} alt="None" />
            </a>
            <div className="title">
              <a className="user-name" href="Profile-Name">{author}</a>
              <div className="post-board-link">
                <a href="actual-post-board-link" className="router-link">
                  <i className="material-icons">sort</i>
                  {boardName}
                </a>
                <span id="divider"> &gt; </span>
                <a href="task-name" className="router-link">{taskName}</a>
              </div>
            </div>
          </div>
          <div className="post-top-right-wrapper" />
        </div>
        <div className="post-body-wrapper">
          <div className="post-body">
            <div className="body-text-container">
              <p className="body-text">{content}</p>
            </div>
          </div>
        </div>
        <div className="post-bottom wrapper">
          <div className="post-bottom-division">
            <div className="post-tools-area">
              <span className="tool-span">
                <i className="material-icons">remove_red_eye </i>
                <span className="tool-counter">{readCount}</span>
              </span>
              <span className="tool-span">
                <i className="material-icons">bookmark_border</i>
              </span>
              <span className="tool-span">
                <i className="material-icons">
                  thumb_up

                </i>
                <span className="tool-counter">{readCount}</span>
              </span>
              <span className="tool-end">
                <i className="material-icons">reply</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-read-container">
        <div className="button-read-wrapper">
          <div className="button-read">
            <button type="button" id="read-button" onClick={toggleReadClick}>
              <i className="material-icons">{commentRead ? 'check_box_outline_blank' : 'check_box'}</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

InboxPosts.propTypes = {
  author: PropTypes.string.isRequired,
  authorPic: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  commentRead: PropTypes.bool.isRequired,
  readCount: PropTypes.number.isRequired,
  commentID: PropTypes.string.isRequired,
  readFunction: PropTypes.func.isRequired,
};

export default InboxPosts;
