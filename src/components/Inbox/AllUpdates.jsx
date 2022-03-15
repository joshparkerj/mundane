import React from 'react';
import './allUpdates.scss';

function AllUpdates({
  author, authorPic, boardName, content, taskName, toggleFunction,
}) {
  return (
    <div className="post-container">
      <div>
        <div className="post-header">
          <div className="post-title">
            <a href="profile_info">
              <img className="profile-pic" src={authorPic} alt="profile-pic" />
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
            <div className="body-text">
              <p>{content}</p>
            </div>
          </div>
        </div>
        <div className="post-bottom wrapper">
          <div className="post-bottom-division">
            <div className="post-tools-area">
              <span className="tool-span">
                <i className="material-icons">remove_red_eye </i>
              </span>
              <span className="tool-span">
                <i className="material-icons">bookmark_border</i>
              </span>
              <span className="tool-span">
                <i className="material-icons">thumb_up</i>
              </span>
              <span className="tool-end">
                <i className="material-icons">reply</i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-read-container">
        button read container
        <div className="button-read-wrapper">
          button read wrapper
          <div className="button-read">
            <span>
              <i className="material-icons" onClick={toggleFunction}>check_box</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUpdates;
