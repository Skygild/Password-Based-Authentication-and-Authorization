// Modules
const express = require("express");
const app = express();
const port = 3001;
const connectDB = require("./db/connectDB");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const passportConfig = require("./config/passportConfig");
const session = require("express-session");
const { checkAuthenticated } = require("./checkAuth/checkAuth");

// Middlewares
app.use(session({ secret: "secrettexthere", saveUninitialized: true, resave: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport

app.use(passport.initialize());
passportConfig(passport);
app.use(passport.session());

// Routes
app.use("/account", userRoutes);
app.use("/home", checkAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, send username
    res.send(`Welcome ${req.user.id}`);
  } else {
    // User is not authenticated, send unauthorized status code
    res.sendStatus(401);
  }
});
app.use("/error", (req, res) => {
  res.send("error");
});

// Start Server
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
connectDB(process.env.URL);
