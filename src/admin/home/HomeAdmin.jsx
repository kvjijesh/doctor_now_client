import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";
import DataTable from "../../components/table/DataTable";
const HomeAdmin = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="table-container">
        <h2>Users</h2>
        <DataTable />
      </div>
    </div>
  );
};

export default HomeAdmin;
