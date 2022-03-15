/* See if a user is author, of a comment,
   or owner of its task or board or team manager over the comment */
const serverError = require('./server-error');

module.exports = (req, res, next) => {
  const commentID = req.params.commentID || req.body.commentID;
  req.db.approval.comment_lord([commentID, req.user[0].id])
    .then((r) => {
      if (r[0].approval) {
        next();
      } else {
        res.status(403).send('not your comment');
      }
    })
    .catch(serverError(res));
};
