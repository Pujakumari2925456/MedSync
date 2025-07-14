const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
} = require("../controllers/adminCtrl");

const router = express.Router();

router.get("/getAllUsers", authMiddleware, getAllUsersController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = router;
