const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
      const user = await User.findOne({ _id: req.user.id }, { purchases: true })
        .populate({
          path: 'purchases',
          populate: {
            path: 'tutorialId',
            match: { deployed: true },
            select: '-content',
          },
        })
        .exec();
      res.json(user.purchases);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to get purchased tutorials');
    }
  },
);

module.exports = router;
