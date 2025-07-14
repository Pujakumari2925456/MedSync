import React, { useEffect } from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "../redux/features/userSlice";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
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
        toast.success(res.data.message);
        dispatch(updateUser(res.data.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateUser(res.data.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Somthing Went Wrong while deleting notifications");
    }
  };
  // return (
  //   <Layout>
  //     <h4 className="p-3 text-center">Notification Page</h4>
  //     <Tabs>
  //       <Tabs.TabPane tab="UnRead" key={0}>
  //         <div className="d-flex justify-content-end">
  //           <h4 className="p-2" onClick={handleMarkAllRead}>
  //             Mark All Read
  //           </h4>
  //         </div>
  //         {user?.notification.map((notificationMgs) => (
  //           <div className="card" style={{ cursor: "pointer" }}>
  //             <div
  //               className="card-text"
  //               onClick={() => navigate(notificationMgs.onClickPath)}
  //             >
  //               {notificationMgs.message}
  //             </div>
  //           </div>
  //         ))}
  //       </Tabs.TabPane>
  //       <Tabs.TabPane tab="Read" key={1}>
  //         <div className="d-flex justify-content-end">
  //           <h4
  //             className="p-2 text-primary"
  //             style={{ cursor: "pointer" }}
  //             onClick={handleDeleteAllRead}
  //           >
  //             Delete All Read
  //           </h4>
  //         </div>
  //         {user?.seennotification.map((notificationMgs) => (
  //           <div className="card" style={{ cursor: "pointer" }}>
  //             <div
  //               className="card-text"
  //               onClick={() => navigate(notificationMgs.onClickPath)}
  //             >
  //               {notificationMgs.message}
  //             </div>
  //           </div>
  //         ))}
  //       </Tabs.TabPane>
  //     </Tabs>
  //   </Layout>
  // );

  const items = [
    {
      label: "unRead",
      key: "1",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMgs, index) => (
            <div key={index} className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
    {
      label: "Read",
      key: "2",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs, index) => (
            <div key={index} className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs items={items} />
    </Layout>
  );
};

export default NotificationPage;
