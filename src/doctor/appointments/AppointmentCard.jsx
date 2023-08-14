import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";

const AppointmentCard = ({ appointment }) => {
  const [appointmentStatus, setAppointmentStatus] = useState(appointment.status);

  const handleConfirmClick = async (e) => {
    e.preventDefault();

    if (appointmentStatus === "completed") {
      return;
    }

    const newStatus = appointmentStatus === "confirmed" ? "completed" : "confirmed";
    setAppointmentStatus(newStatus);

    const res = await axios.put(`/doctor/update-status/${appointment._id}`, {
      status: newStatus,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dtoken")}`,
      },
    });
    console.log(res.data);
  };

  return (
    <div className="appoinment-container">
      <div className="appointment-card">
        <div className="appointment-card-body">
          <p>{appointment.appointment_id}</p>
          <p>{appointment.slot}</p>
          <p>{appointmentStatus}</p>

            <Button
              variant="contained"
              color={appointmentStatus === "confirmed" ? "success" : "secondary"}
              onClick={handleConfirmClick}
              disabled={appointmentStatus === "completed"}
            >
              {appointmentStatus === "confirmed"
                ? "Mark as Completed"
                : appointmentStatus === "Pending"
                ? "Confirm"
                : "Completed"}
            </Button>

        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
