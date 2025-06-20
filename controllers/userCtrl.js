const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel')

// ==========================
// Register Controller
// ==========================
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

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
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send({ message: `LoginController Error: ${error.message}`, success: false });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: 'user not found',
        success: false
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'auth error',
      success: false,
      error
    });
  }
};
//apply Doctor ctrl
const applyDoctorController=async(req,res)=>{
  try{
    const newDoctor=await doctorModel({...req.body,status:'pending'})
    await newDoctor.save()
    const adminUser =await userModel.findOne({isAdmin:true})
    const notification =adminUser.notifcation
    notification.push({
      type:'apply-doctor-request',
      message:`${newDoctor.firstName} ${newDoctor.lastName}Has applied for a doctor account`,
      data:{
        doctorId:newDoctor._id,
        name:newDoctor.firstName+" "+newDoctor.lastName,
        onClickPath:'/admin/doctors'
      }
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification})
    res.status(201).send({
      success:true,
      message:'Doctor Account Applied Sucessfully'
    })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"errior while apply doctor "
    })
  }
}

module.exports = {
  registerController,
  loginController,
  authController,
  applyDoctorController
};
