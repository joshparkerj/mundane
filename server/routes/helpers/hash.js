const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, saltRounds, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
