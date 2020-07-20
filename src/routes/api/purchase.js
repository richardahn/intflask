const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const passport = require('passport');

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');
const Purchase = require('../../models/Purchase');

async function sendPaymentIntentToStripe(
  amount,
  application_fee_amount,
  stripeConnectedAccountId,
) {
  return await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    currency: 'usd',
    amount,
    application_fee_amount,
    transfer_data: {
      destination: stripeConnectedAccountId,
    },
  });
}

function convertPriceForStripe(price) {
  return price.toFixed(2).replace('.', '');
}

router.post(
  '/intent/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Make sure tutorial exists and is deployed
      const tutorial = await Tutorial.findOne({
        deployed: true,
        slug: req.params.slug,
      })
        .populate('userId')
        .exec();
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

      let paymentIntent;
      if (tutorial.price !== 0) {
        paymentIntent = await sendPaymentIntentToStripe(
          convertPriceForStripe(tutorial.price),
          convertPriceForStripe(tutorial.price * 0.2),
          tutorial.userId.stripeConnectedAccountId,
        );
      }

      // // Add purchase to database
      // const purchase = new Purchase({
      //   userId: user.id,
      //   tutorialId: tutorial.id,
      //   price: tutorial.price,
      //   date: Date.now(),
      // });
      // await purchase.save();
      // user.purchases.push(purchase.id);
      // tutorial.purchases.push(purchase.id);
      // await user.save();
      // await tutorial.save();

      if (paymentIntent) {
        res.status(200).json({
          client_secret: paymentIntent.client_secret,
        });
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
