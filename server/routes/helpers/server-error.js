const debug = require('debug');

module.exports = (res) => (err) => {
  debug('server-error')(err);
  return res.status(500).send('messed up');
};
