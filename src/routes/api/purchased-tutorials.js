const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const getEmptyTutorialContent = require('../../utils/tutorial')
  .getEmptyTutorialContent;

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');

// -- Read --
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Get user with purchased tutorials populated, exclude content in populated ones, also make sure they're deployed once again
    try {
      const user = await User.findOne(
        { _id: req.user.id },
        { purchasedTutorials: true },
      )
        .populate('purchasedTutorials', { content: false })
        .exec();
      res.json(user.purchasedTutorials);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to get purchased tutorials');
    }
  },
);

module.exports = router;
