
// const userModel = require('../models/userModels');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // ==========================
// // Register Controller
// // ==========================
// const registerController = async (req, res) => {
//   try {
//     // Check if user already exists
//     const existingUser = await userModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(200).send({ message: "User already exists", success: false });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     req.body.password = hashedPassword;

//     // Save new user
//     const newUser = new userModel(req.body);
//     await newUser.save();

//     res.status(201).send({ message: "Registered Successfully", success: true });
//   } catch (error) {
//     console.error("Register Error:", error.message);
//     res.status(500).send({ message: `RegisterController Error: ${error.message}`, success: false });
//   }
// };

// // ==========================
// // Login Controller
// // ==========================
// const loginController = async (req, res) => {
//   try {
//     // Check if user exists
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(200).send({ message: "User not found", success: false });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res.status(200).send({ message: "Invalid email or password", success: false });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).send({
//       message: "Login Success",
//       success: true,
//       token,
//     });
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     res.status(500).send({ message: `LoginController Error: ${error.message}`, success: false });
//   }
// };

// const authController= async(req,res)=>{
//   try{
//     const user=await userModel.findOne({_id:req.body.userId})
//     if(!user){
//       return res.status(200).send({
//         message:'user not found',
//         success:false
//       })
//     }
//     else{
//       res.status(200).send({
//         success:true,data:{
//           name:user.name,
//           email:user.email,
//         },
//       });
//     }
//   }catch(error){
//     console.log(error)
//     res.status(500).send({
//       message:'auth error',
//       success:false,
//       error
//     })
//   }
// }

// module.exports = {
//   registerController,
//   loginController,
//   authController
// };
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name:user.name,
          email:user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController, authController };