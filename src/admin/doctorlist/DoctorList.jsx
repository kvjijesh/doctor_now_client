import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./doctorlist.scss";
import DataTable from "../../components/table/DataTable";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/admin/doctors-list");
        setDoctors(response.data);

      } catch (error) {
        toast.error(`${error.message}`,{position:toast.POSITION.TOP_CENTER})
      }
    };
    fetchDoctors();
  },[]);

  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'specialisation', label: 'Specialisation', minWidth: 170 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
    },
    {
      id: 'registrationNumber',
      label: 'Registration Number',
      minWidth: 100,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 150,
      align: 'right',
      format: (value) => (
            console.log(value),
        <Button variant="contained" color={value.is_blocked ? 'secondary' : 'primary'}>
          {value.is_blocked ? 'Unblock' : 'Block'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="doctorList">
        <Sidebar />
        <div className="table-container">
          <h2>Doctors</h2>
          <DataTable rows={doctors} columns={columns}/>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
