const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const passport = require('passport');

const validateSignupInput = require('../../utils/validation/signup');
const validateLoginInput = require('../../utils/validation/login');
const generateJwtToken = require('../../utils/jwt');
const sendVerificationEmail = require('../../setup/email')
  .sendVerificationEmail;

const User = require('../../models/User');
const Token = require('../../models/Token');

function generateVerificationToken(userId) {
  return new Token({ userId, token: crypto.randomBytes(16).toString('hex') });
}

router.post('/signup', async (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      creationDate: Date.now(),
      purchases: [],
    });
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    await user.save();

    // Send a verification email
    const verificationToken = generateVerificationToken(user.id);
    await verificationToken.save();
    const verificationLink = `${req.protocol}://${process.env.BASE_CLIENT_URL}/verify/${verificationToken.token}`;
    await sendVerificationEmail(user, verificationLink);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to sign up user');
  }
});

router.post(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Make sure token exists
    try {
      const token = await Token.findOne({ token: req.body.token }).exec();
      if (!token) return res.status(400).json({ tokenDoesntExist: true });

      const user = await User.findOne({ _id: token.userId }).exec();
      if (!user) return res.status(400).json({ userDoesntExist: true });

      if (user.verified) return res.json({ userAlreadyVerified: true });

      // Verify user
      user.verified = true;
      await user.save();
      res.json({ successfullyVerified: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to verify');
    }
  },
);

router.post(
  '/resend',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id }).exec();
      if (!user) throw 'Could not find user';

      const verificationToken = generateVerificationToken(user.id);
      await verificationToken.save();
      const verificationLink = `${process.env.BASE_CLIENT_URL}/verify/${verificationToken.token}`;
      await sendVerificationEmail(user, verificationLink);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to resend verification token');
    }
  },
);

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        generateJwtToken(user, (err, token) => {
          res.json({
            success: true,
            token: token,
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
