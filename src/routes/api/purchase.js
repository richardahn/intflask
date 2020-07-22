const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const passport = require('passport');

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');
const Purchase = require('../../models/Purchase');
const bodyParser = require('body-parser');
const ResponseError = require('../../errors/ResponseError');

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
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;

      // See if intflask added the purchase first
      let purchase = await Purchase.findOne({
        stripePaymentIntentId: paymentIntent.id,
      }).exec();
      if (purchase) {
        purchase.stripeConfirmation = true;
      } else {
        purchase = new Purchase({
          stripePaymentIntentId: paymentIntent.id,
          stripeConfirmation: true,
        });
      }
      await purchase.save();
    }

    res.json({ received: true });
  },
);

router.post(
  '/free/:slug',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).exec();
      const tutorial = await Tutorial.findOne({ slug: req.params.slug }).exec();
      if (tutorial.price !== 0) {
        throw new ResponseError(
          400,
          'Only free tutorials can be purchased from this endpoint',
        );
      }
      const purchase = new Purchase({
        intflaskConfirmation: true,
        stripeConfirmation: true,
        userId: user.id,
        tutorialId: tutorial.id,
        price: tutorial.price,
      });
      await purchase.save();
      user.purchases.push(purchase.id);
      tutorial.purchases.push(purchase.id);
      await user.save();
      await tutorial.save();
      res.status(204).end();
    } catch (error) {
      if (error instanceof ResponseError) {
        error.send(res);
      } else {
        res.status(500).send('Failed to purchase free tutorial');
      }
    }
  },
);

router.post(
  '/complete-intflask-side',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { tutorialSlug, stripePaymentIntentId } = req.body;
      let purchase = await Purchase.findOne({ stripePaymentIntentId }).exec();
      const user = await User.findById(req.user.id).exec();
      const tutorial = await Tutorial.findOne({ slug: tutorialSlug }).exec();
      if (!purchase) {
        // We got the purchase first, so fill it up
        purchase = new Purchase({
          stripePaymentIntentId,
          intflaskConfirmation: true,
          userId: req.user.id,
          tutorialId: tutorial.id,
          price: tutorial.price,
        });
      } else {
        // Stripe's webhook arrived first so fill up the rest of the information
        purchase.intflaskConfirmation = true;
        purchase.userId = req.user.id;
        purchase.tutorialId = tutorial.id;
        purchase.price = tutorial.price;
      }
      await purchase.save();

      // Add connections to user/tutorial
      user.purchases.push(purchase.id);
      tutorial.purchases.push(purchase.id);
      await user.save();
      await tutorial.save();

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Failed to complete intflask's side of the purchase");
    }
  },
);

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
