const User = require('../models/User');

// Must be used after passport authentication
async function userConnectedToStripe(req, res, next) {
  if (req.user) {
    const user = await User.findOne({ _id: req.user.id }).exec();
    if (user.stripeConnectedAccountId) {
      return next();
    } else {
      return res.status(400).json({ notConnectedToStripe: true });
    }
  }
  next();
}

module.exports = userConnectedToStripe;
