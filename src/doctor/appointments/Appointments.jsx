import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./appointment.scss";
import axios from "../../Servies/axiosInterceptor";
import AppointmentCard from "./AppointmentCard";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  console.log(appointments)

  useEffect(() => {
    const appointmentList = async () => {
      try {
        const response = await axios.get("/doctor/appointment-list");
        console.log(response)
        setAppointments(response.data);
      } catch (error) {
        toast.error(`${error.message}`)
      }
    };
    appointmentList();
  }, []);

  const userType = "doctor";
  return (
    <>
      <Header userType={userType} />
      <div className="appointment-head">
        <h2>Your Appointments</h2>
      </div>
      <div className="appoinment-container">
        {appointments.map(appointment => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </>
  );
};

export default Appointments;
