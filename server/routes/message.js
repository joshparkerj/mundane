const express = require('express');

const router = express.Router();

const isAuthenticated = require('./helpers/authorize');
const serverError = require('./helpers/server-error');
const onMessage = require('./helpers/on-message');
const messageRecipient = require('./helpers/message-recipient');
const messageSender = require('./helpers/message-sender');

const rdbm = (req) => req.db.message;
const rjsr = (res) => (r) => res.json(r);
const rsm = (res, message) => () => res.send(message);
const ruser = (req) => req.user[0].id;

router.use((req, res, next) => {
  req.db = req.app.get('db');
  next();
});

// POST /api/message
// req.body requires user id for recipient, and message content
// only works when logged in
router.post('/', isAuthenticated, (req, res) => {
  rdbm(req).post_message([
    ruser(req),
    req.body.recipientID,
    req.body.content,
  ])
    .then(() => rdbm(req).get_message_by_sender_receiver_most_recent([
      ruser(req),
      req.body.recipientID,
    ]))
    .then((msgs) => res.send(`${msgs[0].id}`))
    .catch(serverError(res));
});

// GET /api/message
// gets all messages addressed to user (whoever is logged in on the cookie)
router.get('/', isAuthenticated, (req, res) => {
  rdbm(req).get_messages_by_recipient([ruser(req)])
    .then(rjsr(res))
    .catch(serverError(res));
});

// GET /api/message/sent
// gets all messages the user has sent
router.get('/sent', isAuthenticated, (req, res) => {
  rdbm(req).get_messages_by_sender([ruser(req)])
    .then(rjsr(res))
    .catch(serverError(res));
});

// GET /api/message/id/:messageID
// get message by id
router.get('/id/:messageID', isAuthenticated, onMessage, (req, res) => {
  rdbm(req).get_message_by_id([req.params.id])
    .then(rjsr(res))
    .catch(serverError(res));
});

// PUT /api/message/read
// marks the message as read
// requires req.body.messageID
router.put('/read', isAuthenticated, messageRecipient, (req, res) => {
  rdbm(req).mark_as_read([req.body.messageID])
    .then(rsm(res, 'marked'))
    .catch(serverError(res));
});

// PUT /api/message
// edit a direct message you've sent
// requires req.body.messageID and req.body.content
router.put('/', isAuthenticated, messageSender, (req, res) => {
  rdbm(req).edit_content([req.body.messageID, req.body.content])
    .then(rsm(res, 'edited'))
    .catch(serverError(res));
});

// DELETE /api/message/:messageID
// delete message you sent or received
router.delete('/:messageID', isAuthenticated, onMessage, (req, res) => {
  rdbm(req).delete_message([req.params.messageID])
    .then(rsm(res, 'deleted'))
    .catch(serverError(res));
});

module.exports = router;
