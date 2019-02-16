const express = require('express');
const router = express.Router();

const serverError = require('./helpers/server-error');
const isAuthenticated = require('./helpers/authorize');
const onTeam = require('./helpers/on-team');

router.use((req, res, next) => {
  req.db = req.app.get('db')
  next();
})

// GET /api/dashboard
// Get all of the team members, boards, tasks, assignments, and comments
//     that pertain to a particular team...

router.get('/', isAuthenticated, onTeam, (req,res,next) => {
  res.locals.dash = {};
  req.db.dashboard.get_roster([req.body.teamID])
    .then(roster => {
      res.locals.dash.roster = roster;
      return req.db.dashboard.get_boards([req.body.teamID]);
    })
    .then(boards => {
      res.locals.dash.boards = boards;
      return req.db.dashboard.get_tasks([req.body.teamID]);
    })
    .then(tasks => {
      res.locals.dash.tasks = tasks;
      return req.db.dashboard.get_assignments([req.body.teamID]);
    })
    .then(assignments => {
      res.locals.dash.assignments = assignments;
      return req.db.dashboard.get_comments([req.body.teamID]);
    })
    .then(comments => {
      res.locals.dash.comments = comments;
      res.status(200).json(res.locals.dash);
    })
    .catch(err => serverError(err,res));
})

module.exports = router;
