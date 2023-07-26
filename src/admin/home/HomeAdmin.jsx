import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";

const HomeAdmin = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="table-container">
        <h2>Admin Dashboard</h2>

      </div>
    </div>
  );
};

export default HomeAdmin;
