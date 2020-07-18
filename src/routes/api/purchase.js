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
const Purchase = require('../../models/Purchase');

// -- Create --
router.post(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Make sure tutorial exists and is deployed
      const tutorial = await Tutorial.findOne({
        deployed: true,
        slug: req.params.slug,
      }).exec();

      if (tutorial != null) {
        // Make sure user hasn't purchased tutorial before
        const user = await User.findOne({ _id: req.user.id })
          .populate({
            path: 'purchases',
            match: { tutorialId: tutorial.id },
          })
          .exec();
        if (user.purchases.length > 0) {
          res.status(400).send('User has already purchased this tutorial');
        } else {
          // Add purchase
          const purchase = new Purchase({
            userId: user.id,
            tutorialId: tutorial.id,
            price: tutorial.price,
            date: Date.now(),
          });
          await purchase.save();
          user.purchases.push(purchase.id);
          tutorial.purchases.push(purchase.id);
          await user.save();
          await tutorial.save();
        }
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Could not find tutorial');
    }
  },
);

module.exports = router;
