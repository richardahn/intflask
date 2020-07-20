const express = require('express');
const router = express.Router();
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const userVerified = require('../../middleware/userVerified');
const User = require('../../models/User');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Redirect user to stripe's authorization page
router.get(
  '/',
  [passport.authenticate('jwt', { session: false }), userVerified],
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id }).exec();
      if (!user) throw 'Could not find user';

      // Store state
      const state = uuidv4();
      req.session.state = state;
      req.session.userId = user.id.toString();
      const params = new URLSearchParams({
        client_id: process.env.STRIPE_CONNECT_CLIENT_ID,
        state: state,
        'suggested_capabilities[]': 'transfers',
        'stripe_user[email]': user.email,
        'stripe_user[first_name]': user.firstName,
        'stripe_user[last_name]': user.lastName,
      });
      const stripeOauthLink = `https://connect.stripe.com/express/oauth/authorize?${params.toString()}`;
      // Do NOT redirect to the link; this violates CORS. Instead return the link and navigate to it
      res.status(200).send(stripeOauthLink);
    } catch (error) {
      console.error(error);
      res.status(500).send('Issue processing user for stripe');
    }
  },
);

// Handle redirect back from stripe's authorization page
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  // Make sure state matches
  if (req.session.state !== state) {
    return res
      .status(403)
      .json({ error: 'Incorrect state parameter: ' + state });
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    // Save connected account id
    const connectedAccountId = response.stripe_user_id;
    const user = await User.findOne({ _id: req.session.userId }).exec();
    if (!user) throw 'Could not find user';
    user.stripeConnectedAccountId = connectedAccountId;
    await user.save();

    return res.redirect('/admin');
  } catch (error) {
    console.error(error);
    if (error.type === 'StripeInvalidGrantError') {
      return res
        .status(400)
        .json({ error: 'Invalid authorization code: ' + code });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

module.exports = router;
