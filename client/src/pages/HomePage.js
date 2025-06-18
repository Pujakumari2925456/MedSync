import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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
      if (res.data.success) {
        dispatch(setUser(res.data.data)); // ✅ Save user to Redux
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      {user?.name && (
        <div style={{ fontWeight: "bold", paddingBottom: "10px" }}>
          @{user.name}
        </div>
      )}
      <h1>Home page</h1>
    </Layout>
  );
};

export default HomePage;
