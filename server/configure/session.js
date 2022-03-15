const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// eslint-disable-next-line new-cap
const pgStore = new pgSession({
  conString: process.env.dataBase,
});

module.exports = (app, db) => {
  app.use(session({
    store: pgStore,
    secret: 'jasdkfjalksdjflkasdf',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 5 * 24 * 60 * 60 * 1000, // 5 days
      secure: true,
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user[0].id);
  });
  passport.deserializeUser((id, done) => {
    db.user.get_user([id])
      .then((user) => {
        done(null, user);
      })
      .catch(done);
  });
};
