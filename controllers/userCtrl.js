
const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================
// Register Controller
// ==========================
const registerController = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User already exists", success: false });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Save new user
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).send({ message: `RegisterController Error: ${error.message}`, success: false });
  }
};

// ==========================
// Login Controller
// ==========================
const loginController = async (req, res) => {
  try {
    // Check if user exists
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }

    // Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid email or password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send({ message: `LoginController Error: ${error.message}`, success: false });
  }
};

module.exports = {
  registerController,
  loginController,
};
