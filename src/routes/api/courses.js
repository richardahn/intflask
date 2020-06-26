const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const Course = require('../../models/Course');
const User = require('../../models/User');

router.get(
  '/:courseId',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('GET course');
    res.json({ message: 'received GET' });
  },
);
router.put(
  '/:courseId',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('PUT course');
    res.json({ message: 'received PUT' });
  },
);

module.exports = router;
