const tutorials = require('./api/tutorials');
const adminTutorials = require('./api/admin-tutorials');
const users = require('./api/users');
const google = require('./auth/google');

module.exports = (app) => {
  app.use('/api/admin/tutorials', adminTutorials);
  app.use('/api/tutorials', tutorials);
  app.use('/api/users', users);
  app.use('/auth', google);
};
