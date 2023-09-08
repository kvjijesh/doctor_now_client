import React from "react";
import Header from "../../components/header/Header";
import "./confirmbooking.scss";
import { useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
    const navigate=useNavigate()
    const handleBack=()=>{
        navigate('/available-doctors')
    }

  return (
    <>
      <Header />
      <div className="card-booking">
        <div className="booking-card">
          <h2>BOOKING CONFIRMED</h2>
          <br />
          <button onClick={handleBack}>Go Back</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmBooking;
