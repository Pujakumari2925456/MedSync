import React from "react";
import "../styles/LayoutStyle.css";
import { Link } from "react-router-dom";
import { SidebarMenu } from "../Data/data";
const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="sideBar">
          <div className="logo">
            <h6>DOC APP</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              return (
                <>
                  <div className="menu-item">
                    <i className={menu.icon}></i>
                    <link to={menu.path}>{menu.name}</link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header"></div>
          <div className="body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
