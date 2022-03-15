import React, { Component } from 'react';
import './inboxPosts.scss';
import axios from 'axios';

class InboxPosts extends Component {
  state = {
    clickedLike: false,
  };

  markAsRead = () => {
    axios.post('/api/comment/read', { commentID: this.props.commentID })
      .then(() => this.props.readFunction(this.props.commentID));
  };

  markAsUnread = () => {
    axios.post('/api/comment/unread', { commentID: this.props.commentID })
      .then(() => this.props.readFunction(this.props.commentID));
  };

  toggleReadClick = () => {
    if (this.props.commentRead) { this.markAsUnread(); } else { this.markAsRead(); }
  };

  handleClickLikes = () => {
    if (this.state.clickedLike === false) {
      axios.post('/api/comment/like');
      this.setState({ clickedLike: true });
    }
  };

  render() {
    const {
      author, authorPic, boardName, content, taskName,
    } = this.props;
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
                  <span className="tool-counter">{this.props.readCount}</span>
                </span>
                <span className="tool-span">
                  <i className="material-icons">bookmark_border</i>
                </span>
                <span className="tool-span">
                  <i className="material-icons">
                    thumb_up

                  </i>
                  <span className="tool-counter">{this.props.readCount}</span>
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
                <i className="material-icons" id="read-button" onClick={this.toggleReadClick}>{this.props.commentRead ? 'check_box_outline_blank' : 'check_box'}</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InboxPosts;
