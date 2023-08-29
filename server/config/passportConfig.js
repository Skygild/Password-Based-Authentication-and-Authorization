const bcrypt = require("bcrypt");
const User = require("../model/User");
const userRequest = require("../api/userRequest");
const LocalStrategy = require("passport-local").Strategy;

// Configure of Passport Strategy for sessions
const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      userRequest.loginUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

module.exports = passportConfig;
