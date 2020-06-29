const courses = require('./api/courses');
const adminCourses = require('./api/admin-courses');
const users = require('./api/users');
const google = require('./auth/google');

module.exports = (app) => {
  app.use('/api/admin/courses', adminCourses);
  app.use('/api/courses', courses);
  app.use('/api/users', users);
  app.use('/auth', google);
};
