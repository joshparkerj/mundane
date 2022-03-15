const serverError = require('./server-error');

module.exports = (req, res, next) => {
  const teamID = req.params.teamID || req.body.teamID;
  req.db.approval.is_manager([req.user[0].id, teamID])
    .then((r) => {
      if (r[0].manager) {
        next();
      } else {
        res.status(403).send('manager only');
      }
    })
    .catch(serverError(res));
};
