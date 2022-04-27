const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const serverError = require('./helpers/server-error');
const isAuthenticated = require('./helpers/authorize');
const onTask = require('./helpers/on-task');
const onComment = require('./helpers/on-comment');
const commentLord = require('./helpers/comment-lord');
const rate = require('../rate.json');

router.use(rateLimit(rate));

router.use((req, _, next) => {
  req.db = req.app.get('db');
  next();
});

// POST /api/comment
// requires task id and content
router.post('/', isAuthenticated, onTask, (req, res) => {
  req.db.comment.post_comment([
    req.body.taskID,
    req.user[0].id,
    req.body.content,
  ])
    .then(() => req.db.comment.by_me([req.user[0].id]))
    .then((comments) => res.status(200).json(comments[0]))
    .catch(serverError(res));
});

// GET /api/comment/by-me
// get the comments you've authored
router.get('/by-me', isAuthenticated, (req, res) => {
  req.db.comment.by_me([req.user[0].id])
    .then((comments) => res.status(200).json(comments))
    .catch(serverError(res));
});

// GET /api/comment/on-task/:taskID
// get the comments on a task
// don't forget the taskID param
router.get('/on-task/:taskID', isAuthenticated, onTask, (req, res) => {
  req.db.comment.on_task([req.params.taskID])
    .then((comments) => res.status(200).json(comments))
    .catch(serverError(res));
});

// GET /api/comment/by-id/:commentID
// get the comment indicated by the commentID param
router.get('/by-id/:commentID', isAuthenticated, onComment, (req, res) => {
  req.db.comment.by_id([req.params.commentID])
    .then((comment) => res.status(200).json(comment))
    .catch(serverError(res));
});

// GET /api/comment
// get all the comments I have access to
router.get('/', isAuthenticated, (req, res) => {
  req.db.comment.all([req.user[0].id])
    .then((comments) => res.status(200).json(comments))
    .catch(serverError(res));
});

// PUT /api/comment
// Edit comment/change content
// use req.body.commentID and req.body.content
router.put('/', isAuthenticated, commentLord, (req, res) => {
  req.db.comment.edit([req.body.commentID, req.body.content])
    .then(() => res.status(200).send('updated comment'))
    .catch(serverError(res));
});

// DELETE /api/comment/:commentID
// don't forget the commentID param
router.delete('/:commentID', isAuthenticated, commentLord, (req, res) => {
  req.db.comment.delete([req.params.commentID])
    .then(() => res.status(200).send('deleted comment'))
    .catch(serverError(res));
});

// POST /api/comment/read
// mark comment as read
router.post('/read', isAuthenticated, (req, res) => {
  req.db.comment.mark_read([req.body.commentID, req.user[0].id])
    .then(() => res.status(200).send('marked read'))
    .catch(serverError(res));
});

// POST /api/comment/unread
// mark comment as unread
router.post('/unread', isAuthenticated, (req, res) => {
  req.db.comment.mark_unread([req.body.commentID, req.user[0].id])
    .then(() => res.status(200).send('marked unread'))
    .catch(serverError(res));
});

// POST /api/comment/like
// like comment
router.post('/like', isAuthenticated, (req, res) => {
  req.db.comment.like([req.body.commentID, req.user[0].id])
    .then(() => res.status(200).send('liked'))
    .catch(serverError(res));
});

// POST /api/comment/unlike
// unlike comment
router.post('/unlike', isAuthenticated, (req, res) => {
  req.db.comment.unlike([req.body.commentID, req.user[0].id])
    .then(() => res.status(200).send('unliked'))
    .catch(serverError(res));
});

module.exports = router;
