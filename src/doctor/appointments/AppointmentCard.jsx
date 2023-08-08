import React from "react";
import { Button } from "@mui/material";

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="appointment-card">
      <div className="appointment-card-body">
        {/* Display appointment details here */}
        <div>{appointment.title}</div>
        <div>{appointment.date}</div>
        <div>
          <Button variant="contained" color="success">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
