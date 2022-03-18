const bcrypt = require('bcrypt');

module.exports = (password, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
