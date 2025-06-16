import React from 'react';
import '../styles/LayoutStyles.css';
const Layout = ({children}) => {
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <h6>MEDSYNC</h6>
          <hr></hr>
          <div className="logo">Logo</div>
          
          <div className="menu">Menu</div>
        </div>
        <div className="content">
          <div className="header">Header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
