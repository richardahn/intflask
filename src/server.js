require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const useRoutes = require('./routes');
const useApplicationMiddleware = require('./middleware');

// -- Globals --
global.appRoot = path.join(__dirname, '..');

// -- Configure App --
const app = express();
useApplicationMiddleware(app);
useRoutes(app);
if (process.env.NODE.ENV === 'production') {
  // Serve built react files for production
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// -- Connect mongoose --
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.error(err));

// -- Host server --
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is up and running on port ${port}!`),
);
