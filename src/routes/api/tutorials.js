const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const Tutorial = require('../../models/Tutorial');

// -- Read --
/** Sends back all the tutorials' metadata(excludes the tutorial content) */
router.get('/', (req, res) => {
  Tutorial.find({ deployed: true }, { data: 0 }, (err, tutorials) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error getting tutorials');
    } else {
      res.json(tutorials);
    }
  });
});

module.exports = router;
