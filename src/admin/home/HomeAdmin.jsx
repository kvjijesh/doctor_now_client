import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";
const HomeAdmin = () => {
  return (
    <div className="home">
      <Sidebar />
      <h3>welcome to admin panel</h3>
    </div>
  );
};

export default HomeAdmin;
