import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "../doctorlist/doctorlist.scss";
import DataTable from "../../components/table/DataTable";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";



const UsersList = () => {
    let userType='user'
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users-list");
        setUsers(response.data);
        console.log(users);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "mobile", label: "Mobile", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
  ];

  const handleViewButtonClick = (doctor) => {
    setSelectedUser(doctor);

  };



    const handleUserButtonClick = async (userId, blockedStatus) => {

    try {
      const response = await axios.put(`/admin/block-user/${userId}`, {
        blockedStatus,
      });
      if (response.status === 200) {
        console.log(response);
        const updatedSelectedUser = response.data.doctor;
        setSelectedUser(updatedSelectedUser);
        console.log(selectedUser);

        const actionMessage = blockedStatus ? "blocked" : "unblocked";

        toast.success(`User ${actionMessage} successfully`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Failed to update the doctor status", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, { position: toast.POSITION.TOP_CENTER });
    }
  };


  return (
    <>
      <div className="doctorList">
        <Sidebar />
        <div className="table-container">
          <h2>Users</h2>

          <DataTable
            rows={users}
            columns={columns}
            userType={userType}
            onViewButtonClick={handleViewButtonClick}
            onUserBlockButtonClick={handleUserButtonClick}
          />
        </div>
      </div>

    </>
  );
};

export default  UsersList;
