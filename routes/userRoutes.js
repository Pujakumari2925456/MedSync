const express = require('express');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController
} = require("../controllers/userCtrl");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// LOGIN || POST
router.post('/login', loginController);

// REGISTER || POST
router.post('/register', registerController);

// GET USER DATA || POST
router.post('/getUserData', authMiddleware, authController);

// APPLY DOCTOR || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

module.exports = router;
