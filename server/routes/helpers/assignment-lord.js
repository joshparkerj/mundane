/* See if the user created the assignment
   or owns its task
   or owns its board
   or manages its team
   or is the assigned user */
const serverError = require('./server-error');

module.exports = (req, res, next) => {
  const assignmentID = req.params.assignmentID || req.body.assignmentID;
  req.db.approval.assignment_lord([assignmentID, req.user[0].id])
    .then((r) => {
      if (r[0].approval) {
        next();
      } else {
        res.status(403).send('not your assignment');
      }
    })
    .catch(serverError(res));
};
