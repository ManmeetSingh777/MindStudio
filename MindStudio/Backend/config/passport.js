const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

module.exports = function(passport) {
  // Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;

        try {
          let user = await User.findOne({ googleId: id });

          if (user) {
            return done(null, user);
          }

          user = new User({
            googleId: id,
            name: displayName,
            email: emails[0].value,
            role: 'user', // Default role
            isAdmin: emails[0].value === 'admin@example.com' // Check if admin
          });

          await user.save();
          done(null, user);
        } catch (error) {
          console.error(error);
          done(error, false);
        }
      }
    )
  );

  // JWT strategy
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (jwt_payload, done) => {
        try {
          const user = await User.findById(jwt_payload.userId);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
