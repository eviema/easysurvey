const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // "user" - mongoose model
  done(null, user.id); // "user.id" - mongoDB autogenerated id
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // findOne returns a "promise", asynchronous,
      // existingUser - Model Instance, can be null
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already ahve a record with the given profile id
          done(null, existingUser); // null - means no error
        } else {
          // we don't have a user record with this id, make a new record
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user)); // promise callback,
          // "user" - already saved and sent back
        }
      });
    }
  )
);
