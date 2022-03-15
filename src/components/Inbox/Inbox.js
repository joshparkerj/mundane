import React, { Component } from 'react';
import './inbox.scss';
import axios from 'axios';
import DefaultInbox from './DefaultInbox';
import InboxPosts from '../InboxPosts/InboxPosts';
import DirectMessages from './DirectMessages';

class Inbox extends Component {
  state = {
    directMessages: [],
    comments: [],
    allUpdates: false,
    count: null,
  };

  componentDidMount() {
    this.getDirectMessages();
    this.getComments();
  }

  getDirectMessages = () => {
    axios.get('/api/message')
      .then((response) => {
        this.setState({ directMessages: response.data });
      });
  };

  getComments = () => {
    axios.get('/api/comment')
      .then((comments) => {
        this.setState({ comments: comments.data });
      });
  };

  countComments = () => this.state.comments.filter((comment) => !comment.read).length;

  markCommentRead = (commentID) => {
    const { comments } = this.state;
    const comment = comments.find((comment) => comment.id === commentID);
    comment.read = !comment.read;
    this.setState({ comments: [...comments] });
  };

  showAllUpdates = () => this.state.comments.map(this.renderInboxPosts);

  showOpenUpdates = () => this.state.comments.filter((comment) => !comment.read).map(this.renderInboxPosts);

  showDirectMessages = () => this.state.directMessages.map(this.renderDirectMessages);

  renderInboxPosts = (comment, index) => (
    <InboxPosts
      author={comment.author}
      authorPic={comment.author_pic}
      boardName={comment.board}
      content={comment.content}
      taskName={comment.task}
      commentID={comment.id}
      key={index}
      readFunction={this.markCommentRead}
      commentRead={comment.read}
      readCount={comment.read_count}
      likesCount={comment.like_count}
    />
  );

  renderDirectMessages = (message, index) => (
    <DirectMessages
      author={message.author}
      authorPic={message.author_pic}
      content={message.content}
      key={index}
    />
  );

  handleAllUpdates = (event) => {
    event.preventDefault();
    this.setState({ allUpdates: true, showDirectMessages: false });
  };

  handleOpenUpdates = (event) => {
    event.preventDefault();
    this.setState({ allUpdates: false, showDirectMessages: false });
  };

  handleDirectMessages = (event) => {
    event.preventDefault();
    this.setState({ allUpdates: false, showDirectMessages: true });
  };

  render() {
    return (
      <div className="inbox-wrapper-component">
        <div className="inbox-title-wrapper">
          <span className="inbox-title-comp">Inbox</span>
          <div className="inbox-title-actions">
            <span className="inbox-toggle-mode">
              <span className="active" onClick={this.handleOpenUpdates}>
                {' '}
                Open (
                {this.countComments()}
                )
                {' '}
              </span>
              /
              <span className="inbox-all-updates" onClick={this.handleAllUpdates}> All Updates </span>
              /
              <span className="inbox-direct-messages" onClick={this.handleDirectMessages}> DMs</span>
            </span>
          </div>
        </div>
        <div className="middle-space-wrapper">
          <div className="posts-list">
            {(this.countComments() > 0 && !this.state.allUpdates) || (this.state.comments.length > 0 && this.state.allUpdates)
              ? ''
              : (<DefaultInbox />)}
            {this.state.allUpdates
              ? this.showAllUpdates()
              : this.state.showDirectMessages
                ? this.showDirectMessages()
                : this.showOpenUpdates()}
          </div>
        </div>
      </div>
    );
  }
}

export default Inbox;
