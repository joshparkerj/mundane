const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const serverError = require('./helpers/server-error');
const isAuthenticated = require('./helpers/authorize');
const onTeam = require('./helpers/on-team');
const rate = require('../rate.json');

router.use(rateLimit(rate));

router.use((req, _, next) => {
  req.db = req.app.get('db');
  next();
});

// GET /api/dashboard
// get all dashboard items
router.get('/', isAuthenticated, (req, res) => {
  res.locals.dash = {};
  req.db.dashboard.get_all_rosters([req.user[0].id])
    .then((roster) => {
      res.locals.dash.roster = roster;
      return req.db.dashboard.get_all_boards([req.user[0].id]);
    })
    .then((boards) => {
      res.locals.dash.boards = boards;
      return req.db.dashboard.get_all_tasks([req.user[0].id]);
    })
    .then((tasks) => {
      res.locals.dash.tasks = tasks;
      return req.db.dashboard.get_all_assignments([req.user[0].id]);
    })
    .then((assignments) => {
      res.locals.dash.assignments = assignments;
      return req.db.comment.all([req.user[0].id]);
    })
    .then((comments) => {
      res.locals.dash.comments = comments;
      return req.db.message.get_messages_by_recipient([req.user[0].id]);
    })
    .then((messages) => {
      res.locals.dash.messages = messages;
      res.status(200).json(res.locals.dash);
    })
    .catch(serverError(res));
});

// GET /api/dashboard/team/:teamID
// Get all of the team members, boards, tasks, assignments, and comments
//     that pertain to a particular team...
router.get('/team/:teamID', isAuthenticated, onTeam, (req, res) => {
  res.locals.dash = {};
  req.db.dashboard.get_roster([req.params.teamID])
    .then((roster) => {
      res.locals.dash.roster = roster;
      return req.db.dashboard.get_boards([req.params.teamID]);
    })
    .then((boards) => {
      res.locals.dash.boards = boards;
      return req.db.dashboard.get_tasks([req.params.teamID]);
    })
    .then((tasks) => {
      res.locals.dash.tasks = tasks;
      return req.db.dashboard.get_assignments([req.params.teamID]);
    })
    .then((assignments) => {
      res.locals.dash.assignments = assignments;
      return req.db.dashboard.get_comments([req.params.teamID]);
    })
    .then((comments) => {
      res.locals.dash.comments = comments;
      res.status(200).json(res.locals.dash);
    })
    .catch(serverError(res));
});

router.get('/');

router.get('/all', isAuthenticated, (req, res) => {
  res.locals.dash = {};
  req.db.dashboard.get_all_rosters([req.user[0].id])
    .then((roster) => {
      res.locals.dash.roster = roster;
      return req.db.dashboard.get_all_boards([req.user[0].id]);
    })
    .then((boards) => {
      res.locals.dash.boards = boards;
      return req.db.dashboard.get_all_tasks([req.user[0].id]);
    })
    .then((tasks) => {
      res.locals.dash.tasks = tasks;
      return req.db.dashboard.get_all_assignments([req.user[0].id]);
    })
    .then((assignments) => {
      res.locals.dash.assignments = assignments;
      return req.db.dashboard.get_all_comments([req.user[0].id]);
    })
    .then((comments) => {
      res.locals.dash.comments = comments;
      res.status(200).json(res.locals.dash);
    })
    .catch((err) => serverError(err, res));
});

module.exports = router;
