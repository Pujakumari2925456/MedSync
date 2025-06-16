import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input, message } from 'antd';
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading}from "../redux/features/alertSlice";
import { Link, useNavigate } from 'react-router-dom'; // ✅ FIXED: useNavigate imported properly
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate(); // ✅ FIXED: useNavigate() instead of userNavigate()
  const dispatch =useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values);
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        message.success('Login Successfully'); // ✅ Corrected spelling
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
          <Input type="password" />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>
        <button className="btn btn-primary" type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;

