const User = require("../model/User");
const bcrypt = require("bcrypt");

// Create User Request
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Hashed and salt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword };
    //Create User using mongoose built-in function
    const user = await User.create(newUser);

    return res.status(201).json(user);
  } catch (error) {
    return console.log(error);
  }
};

// User Login Request
const loginUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "Email not found" });
    }
    // Compare password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return done(null, false, { message: "Wrong password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

module.exports = { createUser, loginUser };
