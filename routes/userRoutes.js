const express = require('express');
const {
  loginController,
  registerController,
} = require("../controllers/userCtrl");

// Router object
const router = express.Router();

// Routes
// LOGIN || POST
router.post('/login', loginController);

// REGISTER || POST
router.post('/register', registerController);

module.exports = router;
