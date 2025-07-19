// import React from "react";
// import "../styles/LayoutStyles.css";
// import { adminMenu, userMenu } from "./../Data/data";

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { message } from "antd";

// const Layout = ({ children }) => {
//   const { user } = useSelector((state) => state.user);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // logout function
//   const handleLogout = () => {
//     localStorage.clear();
//     message.success("Logout Successfully");
//     navigate("/login");
//   };

//   // rendering menu list
//   const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

//   return (
//     <>
//       <div className="main">
//         <div className="layout">
//           <div className="sidebar">
//             <div className="logo">
//               <h6>MedSync</h6>
//               <hr />
//             </div>
//             <div className="menu">
//               {userMenu.map((menu) => {
//                 const isActive = location.pathname === menu.path;
//                 return (
//                   <div key={menu.path} className={`menu-item ${isActive && "active"}`}>
//                     <i className={menu.icon}></i>
//                     <Link to={menu.path}>{menu.name}</Link>
//                   </div>
//                 );
//               })}
//               <div className="menu-item" onClick={handleLogout}>
//                 <i className="fa-solid fa-right-from-bracket"></i>
//                 <Link to="/login">Logout</Link>
//               </div>
//             </div>
//           </div>
//           <div className="content">
//             <div className="header">
//               <div className="header-content">
//                 <i className="fa-solid fa-bell"></i>
//                 <Link to="/profile">{user?.name}</Link>
//               </div>
//             </div>
//             <div className="body">{children}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

import React, { useEffect } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/features/userSlice";
import axios from "axios";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  //For polling: fetching here as layout is used in every so useeffect will trigger on every page in 5 sec
  const fetchUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        if (
          user?.notification &&
          res.data.data.notification.length > user.notification.length
        ) {
          toast.info("New notification received!");
        }

        dispatch(updateUser(res.data.data));
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
  };

  // Choose menu based on user role
  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  useEffect(() => {
    if (user?.isAdmin) {
      const interval = setInterval(fetchUserData, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>MedSync</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.path}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                {
                  <Badge
                    count={user?.notification?.length || 0}
                    onClick={() => {
                      navigate("/notification");
                    }}
                  >
                    <i className="fa-solid fa-bell"></i>
                  </Badge>
                }
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
