const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const getEmptyTutorialContent = require('../../utils/tutorial')
  .getEmptyTutorialContent;
const validPurchase = require('../../utils/validation/purchase');

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');

const ResponseError = require('../../errors/ResponseError');

/*
Note: This api returns tutorial content(when getting a single tutorial), and is blocked by:
  (1) user authentication
  (2) purchase verification
*/

// -- Read --
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Get user with purchased tutorials populated, exclude content in populated ones, also make sure they're deployed once again
    try {
      const user = await User.findById(req.user.id, { purchases: true })
        .populate({
          path: 'purchases',
          populate: {
            path: 'tutorialId',
            match: { deployed: true },
            select: '-content',
          },
        })
        .exec();

      const tutorials = user.purchases // Don't filter out purchases that haven't been confirmed by stripe. This is intentional
        .map((p) => p.tutorialId);
      res.json(tutorials);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to get purchased tutorials');
    }
  },
);

router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id, {
        purchases: true,
      })
        .populate({
          path: 'purchases',
          populate: {
            path: 'tutorialId',
            match: { deployed: true, slug: req.params.slug },
          },
        })
        .exec();
      const purchase = user.purchases.filter((p) => p.tutorialId != null)[0];
      if (!validPurchase(purchase)) {
        throw new ResponseError(
          400,
          'Stripe has not yet validated the purchase. Please allow a short moment for stripe to confirm the purchase and then try again.',
          { stripeNotConfirmed: true },
        );
      }

      res.json(purchase.tutorialId);
    } catch (error) {
      console.error(error);
      if (error instanceof ResponseError) {
        error.send(res);
      } else {
        res.status(500).send('Failed to get tutorial for an unknown reason.');
      }
    }
  },
);

module.exports = router;
