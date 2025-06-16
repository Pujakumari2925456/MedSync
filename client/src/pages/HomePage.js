import React, { useEffect } from "react";
import axios from "axios";
// import { Layout } from "antd";
import Layout from "../components/Layout";

const HomePage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("User Data:", res.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Home page</h1>
    </Layout>
  );
};

export default HomePage;


