import React from "react";
import Header from "../../components/header/Header";
import "./confirmbooking.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
    const navigate=useNavigate()
    const handleBack=()=>{
        navigate('/available-doctors')
    }
    const appointment=useSelector((state)=>state.appointment?.appointment?.appointment)
    console.log(appointment)
  return (
    <>
      <Header />
      <div className="card-booking">
        <div className="booking-card">
          <h2>BOOKING CONFIRMED</h2>
          <br />
          <p>Appoinment Id:  {appointment?.appointment_id}</p>
          <p>Time:  {appointment?.slot}</p>
          <br />
          <button onClick={handleBack}>Go Back</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmBooking;
