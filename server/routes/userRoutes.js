const express = require("express");
const passport = require("passport");
const userRoutes = express.Router();
const userRequest = require("../api/userRequest");
const { checkNotAuthenticated } = require("../checkAuth/checkAuth");

userRoutes.route("/signup").post(userRequest.createUser);
userRoutes.route("/login").post(
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/error",
  })
);

module.exports = userRoutes;
