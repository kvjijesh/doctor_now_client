import React, { useEffect, useState } from "react";
import "./userslist.scss";
import DataTable from "../../components/table/DataTable";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { loginSucces } from "../../features/user/userSlice";

const UsersList = () => {
  let userType = "user";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [block,setBlock]=useState('')
  const dispatch=useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/admin/users-list");
        setUsers(response.data);
        setIsLoading(false);

      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchUsers();
  }, [block]);

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
        setBlock(!blockedStatus)
        dispatch(loginSucces(response.data.user))
        const updatedSelectedUser = response.data.user;
        setSelectedUser(updatedSelectedUser);


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
      toast.error(`${error.response?.data?.message}`,{position:toast.POSITION.TOP_CENTER});
    }
  };

  return (
    <>
      <div className="user-heading">
        <h2>Users</h2>
      </div>
      <div className="user-list">
        {isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            rows={users}
            columns={columns}
            userType={userType}
            onViewButtonClick={handleViewButtonClick}
            onUserBlockButtonClick={handleUserButtonClick}

          />
        )}
      </div>
    </>
  );
};

export default UsersList;
