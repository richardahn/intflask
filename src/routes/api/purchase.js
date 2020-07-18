const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const convertTutorialContentToOutline = require('../../utils/tutorial')
  .convertTutorialContentToOutline;

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');

// -- Create --
router.post(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tutorial = await Tutorial.findOne({
        deployed: true,
        slug: req.params.slug,
      }).exec();

      if (tutorial != null) {
        const user = await User.findOneAndUpdate(
          { _id: req.user.id, purchasedTutorials: { $ne: tutorial.id } },
          { $push: { purchasedTutorials: tutorial.id } },
        ).exec();
        console.log(user);
      }

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Could not find tutorial');
    }
  },
);

module.exports = router;
