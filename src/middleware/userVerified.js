const User = require('../models/User');

// Must be used after passport authentication
async function userVerified(req, res, next) {
  if (req.user) {
    const user = await User.findOne({ _id: req.user.id }).exec();
    if (user.verified) {
      next();
    } else {
      return res.status(400).json({ notVerified: true });
    }
  }
  next();
}

module.exports = userVerified;
