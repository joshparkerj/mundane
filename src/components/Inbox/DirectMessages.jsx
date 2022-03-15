import React from 'react';
import './directMessages.scss';
import axios from 'axios';
import PropTypes from 'prop-types';

const DirectMessages = function DirectMessages({
  commentID, commentRead, author, authorPic, content, readFunction, readCount,
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

  const handleClickLikes = () => {
    axios.post('/api/comment/like');
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
              <a className="user-name" href="Profile-Name">
                Direct message from
                {' '}
                {author}
              </a>
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
                <i tabIndex="-1" role="button" className="material-icons" onClick={handleClickLikes} onKeyPress={handleClickLikes}>thumb_up</i>
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
            <span>
              <i tabIndex="-1" role="button" className="material-icons" id="read-button" onClick={toggleReadClick} onKeyPress={toggleReadClick}>{commentRead ? 'check_box_outline_blank' : 'check_box'}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

DirectMessages.propTypes = {
  commentID: PropTypes.string.isRequired,
  commentRead: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  authorPic: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  readFunction: PropTypes.func.isRequired,
  readCount: PropTypes.number.isRequired,
};

export default DirectMessages;
