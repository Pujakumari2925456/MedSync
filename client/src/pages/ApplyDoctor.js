import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submit
  const handleFinish = async (values) => {
    // ✅ Check if user exists
    if (!user || !user._id) {
      message.error("User data not found. Please login again.");
      return;
    }

    try {
      dispatch(showLoading());

      // ⏰ Convert timings from moment to string
      const formattedTimings = [
        values.timings[0].format("HH:mm"),
        values.timings[1].format("HH:mm"),
      ];

      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          timings: formattedTimings,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="bg-light py-4">
        <Card className="mx-auto" style={{ maxWidth: 1000 }}>
          <h1 className="text-center mb-4">Apply Doctor</h1>
          <Form layout="vertical" onFinish={handleFinish}>
            {/* PERSONAL DETAILS */}
            <h4>Personal Details :</h4>
            <Row gutter={20}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "First name is required" }]}
                >
                  <Input placeholder="Your first name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input placeholder="Your last name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  rules={[{ required: true, message: "Phone number is required" }]}
                >
                  <Input placeholder="Your contact no" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input type="email" placeholder="Your email address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Website" name="website">
                  <Input placeholder="Your website" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Address is required" }]}
                >
                  <Input placeholder="Your clinic address" />
                </Form.Item>
              </Col>
            </Row>

            {/* PROFESSIONAL DETAILS */}
            <h4>Professional Details :</h4>
            <Row gutter={20}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  rules={[{ required: true, message: "Specialization is required" }]}
                >
                  <Input placeholder="Your specialization" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  rules={[{ required: true, message: "Experience is required" }]}
                >
                  <Input placeholder="Your experience" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Fees Per Consultation"
                  name="feesPerConsultation"
                  rules={[{ required: true, message: "Fees is required" }]}
                >
                  <Input type="number" placeholder="Your consultation fee" />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Timings"
                  name="timings"
                  rules={[{ required: true, message: "Timings are required" }]}
                >
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>

            {/* SUBMIT BUTTON */}
            <div className="text-center mt-4">
              <button className="btn btn-primary px-5" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
