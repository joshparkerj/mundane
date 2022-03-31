import React, { useEffect, useState } from 'react';
import './inbox.scss';
import axios from 'axios';
import DefaultInbox from './DefaultInbox';
import InboxPosts from '../InboxPosts/InboxPosts';
import DirectMessages from './DirectMessages';

const Inbox = function Inbox() {
  const [directMessages, setDirectMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [allUpdates, setAllUpdates] = useState(false);
  const [shouldShowDirectMessages, setShouldShowDirectMessages] = useState(false);

  const getDirectMessages = () => {
    axios.get('/api/message')
      .then(({ data }) => {
        setDirectMessages(data);
      });
  };

  const getComments = () => {
    axios.get('/api/comment')
      .then(({ data }) => {
        setComments(data);
      });
  };

  useEffect(() => {
    getDirectMessages();
    getComments();
  }, []);

  const countComments = () => comments.filter((comment) => !comment.read).length;

  const markCommentRead = (commentID) => {
    const comment = comments.find((c) => c.id === commentID);
    comment.read = !comment.read;
    setComments([...comments]);
  };

  const renderInboxPosts = (comment, index) => (
    <InboxPosts
      author={comment.author}
      authorPic={comment.author_pic}
      boardName={comment.board}
      content={comment.content}
      taskName={comment.task}
      commentID={comment.id}
      key={index}
      readFunction={markCommentRead}
      commentRead={comment.read}
      readCount={comment.read_count}
      likesCount={comment.like_count}
    />
  );

  const renderDirectMessages = (message, index) => (
    <DirectMessages
      author={message.author}
      authorPic={message.author_pic}
      content={message.content}
      key={index}
    />
  );

  const showAllUpdates = () => comments.map(renderInboxPosts);

  const showOpenUpdates = () => comments.filter((comment) => !comment.read).map(renderInboxPosts);

  const showDirectMessages = () => directMessages.map(renderDirectMessages);

  const handleAllUpdates = (event) => {
    event.preventDefault();
    setAllUpdates(true);
    setShouldShowDirectMessages(false);
  };

  const handleOpenUpdates = (event) => {
    event.preventDefault();
    setAllUpdates(false);
    setShouldShowDirectMessages(false);
  };

  const handleDirectMessages = (event) => {
    event.preventDefault();
    setAllUpdates(false);
    setShouldShowDirectMessages(true);
  };

  const showPostsList = () => {
    if (allUpdates) {
      return showAllUpdates();
    }

    if (shouldShowDirectMessages) {
      return showDirectMessages();
    }

    return showOpenUpdates();
  };

  return (
    <div className="inbox-wrapper-component">
      <div className="inbox-title-wrapper">
        <span className="inbox-title-comp">Inbox</span>
        <div className="inbox-title-actions">
          <span className="inbox-toggle-mode">
            <button type="button" className="active" onClick={handleOpenUpdates}>
              {' '}
              Open (
              {countComments()}
              )
              {' '}
            </button>
            /
            <button type="button" className="inbox-all-updates" onClick={handleAllUpdates}> All Updates </button>
            /
            <button type="button" className="inbox-direct-messages" onClick={handleDirectMessages}> DMs</button>
          </span>
        </div>
      </div>
      <div className="middle-space-wrapper">
        <div className="posts-list">
          {(countComments() > 0 && !allUpdates) || (comments.length > 0 && allUpdates)
            ? ''
            : (<DefaultInbox />)}
          {showPostsList()}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
