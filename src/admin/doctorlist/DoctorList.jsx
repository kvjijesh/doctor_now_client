import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./doctorlist.scss";
import DataTable from "../../components/table/DataTable";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import { Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/admin/doctors-list");
        setDoctors(response.data);
      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchDoctors();
  }, [doctors]);

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "specialisation", label: "Specialisation", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "registrationNumber",
      label: "Registration Number",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const handleViewButtonClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleApproveButtonClick = async (doctorId) => {
    try {
      const response = await axios.put(`/admin/approve/${doctorId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsModalOpen(false);
      toast.success("Doctor approved successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(`${error.message}`, { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleBlockButtonClick = async (doctorId, blockedStatus) => {
    try {
      const response = await axios.put(`/admin/block-doctor/${doctorId}`,
        {blockedStatus}
      ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    }});
      if (response.status === 200) {
        const updatedSelectedDoctor = response.data.doctor;
        setSelectedDoctor(updatedSelectedDoctor);
        const actionMessage = blockedStatus ? "blocked" : "unblocked";
        setIsModalOpen(false);
        toast.success(`Doctor ${actionMessage} successfully`, {
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

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="doctorList">
        <Sidebar />
        <div className="table-container">
          <h2>Doctors</h2>

          <DataTable
            rows={doctors}
            columns={columns}
            onViewButtonClick={handleViewButtonClick}
            onApproveButtonClick={handleApproveButtonClick}
            onBlockButtonClick={handleBlockButtonClick}
          />
        </div>
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <div className="modal-container">
          <div className="modal-content">
            <h2>{selectedDoctor?.name}</h2>
            <p>Registration Number: {selectedDoctor?.registrationNumber}</p>
            <p>Registration Council: {selectedDoctor?.registrationCouncil}</p>
            <p>Registration Year: {selectedDoctor?.registrationYear}</p>
            <div className="modal-buttons">
              {selectedDoctor?.is_blocked ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() =>
                    handleBlockButtonClick(
                      selectedDoctor?._id,
                      !selectedDoctor?.is_blocked
                    )
                  }
                >
                  Unblock
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    handleBlockButtonClick(
                      selectedDoctor?._id,
                      !selectedDoctor?.is_blocked
                    )
                  }
                >
                  Block
                </Button>
              )}
              {selectedDoctor?.isVerified ? (
                <Button variant="contained" color="primary" disabled>
                  Approved
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApproveButtonClick(selectedDoctor?._id)}
                >
                  Approve
                </Button>
              )}
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DoctorList;
