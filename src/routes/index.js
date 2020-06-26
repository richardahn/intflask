const courses = require('./api/courses');
const users = require('./api/users');
const google = require('./auth/google');

module.exports = (app) => {
  app.use('/api/courses', courses);
  app.use('/api/users', users);
  app.use('/auth', google);
};
