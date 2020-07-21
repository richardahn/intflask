const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const AnonymousStrategy = require('passport-anonymous').Strategy;
const sendVerificationEmail = require('./email').sendVerificationEmail;
const generateVerificationToken = require('../utils/emailVerification')
  .generateVerificationToken;
const getVerificationLink = require('../utils/emailVerification')
  .getVerificationLink;

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Since we're getting an encrypted JWT token as a parameter, it'd be better if we could just have it decrypted automatically, this is what this option does
  secretOrKey: process.env.SECRET_OR_KEY,
};

const googleOpts = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL, // After logging in, we should be redirected to the home page
};

module.exports = (passport) => {
  // To make optional protected(can be authenticated or anonymous) endpoints
  passport.use(new AnonymousStrategy());

  // This is called as middleware to make protected endpoints
  passport.use(
    new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id).exec();
        if (user) return done(null, user);

        return done(null, false);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }),
  );
  // Note: This is called in the google login/callback stages. This is NOT used to make endpoints protected
  passport.use(
    new GoogleStrategy(
      googleOpts,
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ providerId: profile.id }).exec();
          if (user) {
            console.log('An account with this google log in already exists');
            return done(null, user);
          }

          user = new User({
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            provider: 'google',
            providerId: profile.id,
            creationDate: Date.now(),
          });

          await user.save();

          const verificationToken = generateVerificationToken(user.id);
          await verificationToken.save();
          const verificationLink = getVerificationLink(verificationToken.token);
          await sendVerificationEmail(user, verificationLink);

          console.log(`Created new google oauth user: ${user}`);
          done(null, user);
        } catch (error) {
          console.error(error);
          done(err);
        }
      },
    ),
  );
};
