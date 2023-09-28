import React from "react";
import Header from "../../components/header/Header";
import "./confirmbooking.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ConfirmBooking = () => {
    const navigate=useNavigate()
    const handleBack=()=>{
        navigate('/all-doctors')
    }

  return (
    <>
      <Header />
      <div className="card-booking">
        <div className="booking-card">
          <h2>BOOKING CONFIRMED</h2>
          <br />
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    </>
  );
};

export default ConfirmBooking;
