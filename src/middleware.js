const bodyParser = require('body-parser');
const passport = require('passport');
const setupPassport = require('./config/passport');

function addMiddleware(app) {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: '50mb',
    }),
  );
  app.use(passport.initialize());
  setupPassport(passport);
}

module.exports = addMiddleware;
