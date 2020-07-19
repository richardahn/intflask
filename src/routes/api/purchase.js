const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const passport = require('passport');

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');
const Purchase = require('../../models/Purchase');

async function sendPaymentToStripe(amount, source, receipt_email) {
  return await stripe.charges.create({
    amount,
    currency: 'usd',
    source,
    receipt_email,
  });
}

function convertPriceForStripe(price) {
  return price.toFixed(2).replace('.', '');
}

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
      if (tutorial == null)
        return res
          .status(400)
          .send('Tutorial does not exist, or is not deployed');

      // Make sure user hasn't purchased tutorial before
      const user = await User.findOne({ _id: req.user.id })
        .populate({
          path: 'purchases',
          match: { tutorialId: tutorial.id },
        })
        .exec();
      if (user.purchases.length > 0)
        return res.status(400).send('User has already purchased this tutorial');

      let charge;
      if (tutorial.price !== 0) {
        const { source, receipt_email } = req.body;
        charge = await sendPaymentToStripe(
          convertPriceForStripe(tutorial.price),
          source,
          receipt_email,
        );
      }

      // Add purchase to database
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

      if (charge) {
        res.status(200).json(charge);
      } else {
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Could not find tutorial');
    }
  },
);

module.exports = router;
