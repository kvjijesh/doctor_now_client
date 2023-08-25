import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./appointment.scss";
import axios from "../../Servies/axiosInterceptor";
import AppointmentCard from "./AppointmentCard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const Appointments = () => {
  const doctorData = useSelector((state) => state.doctor.doctor);
  const doctorId=doctorData?._id

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const appointmentList = async () => {
      try {
        const response = await axios.get(`/doctor/appointment-list/${doctorId}`,);

        setAppointments(response.data);
      } catch (error) {
        toast.error(`${error.message}`,{position:toast.POSITION.TOP_CENTER})
      }
    };
    appointmentList();
  },[]);

  const userType = "doctor";
  return (
    <>
      <Header userType={userType} />
      <div className="appointment-head">
        <h2>Your Appointments</h2>
      </div>

        {appointments.map(appointment => (
          <AppointmentCard key={appointment._id} appointment={appointment} />

        ))}

    </>
  );
};

export default Appointments;
