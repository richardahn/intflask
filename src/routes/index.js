const tutorials = require('./api/tutorials');
const adminTutorials = require('./api/admin-tutorials');
const purchasedTutorials = require('./api/purchased-tutorials');
const users = require('./api/users');
const google = require('./auth/google');
const purchase = require('./api/purchase');
const technologies = require('./api/technologies');
const images = require('./content/images');

module.exports = (app) => {
  app.use('/api/admin/tutorials', adminTutorials);
  app.use('/api/tutorials', tutorials);
  app.use('/api/users', users);
  app.use('/api/purchase', purchase);
  app.use('/api/purchased-tutorials', purchasedTutorials);
  app.use('/api/technologies', technologies);
  app.use('/auth', google);
  app.use('/content/images', images);
};
