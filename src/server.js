const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const addRoutes = require('./routes/index');
const addMiddleware = require('./middleware');
const path = require('path');

// -- Globals --
global.appRoot = path.join(__dirname, '..');

// -- Configure App --
const app = express();
addMiddleware(app);
addRoutes(app);

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
