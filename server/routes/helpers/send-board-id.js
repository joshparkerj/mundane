/* See if a user is an approved member of the board */
const serverError = require('./server-error');

module.exports = (id, name, req, res) => {
  req.db.approval.on_board([req.user[0].id, id])
    .then((r) => {
      if (r[0] && r[0].approved) {
        res.status(200).json({ name, id });
      } else {
        res.status(403).send('approved team members only');
      }
    })
    .catch(serverError(res));
};
