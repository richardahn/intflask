const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const setupPassport = require('../setup/passport');

function useApplicationMiddleware(app) {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: '50mb',
    }),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      // cookie: { secure: true },
    }),
  );
  app.use(passport.initialize());
  setupPassport(passport);
}

module.exports = useApplicationMiddleware;
