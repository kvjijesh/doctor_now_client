import React from "react";
import BookingCard from "./BookingCard";
import "./booking.scss";
import {  useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";


const Booking = () => {
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const slot=location.state?.slot;
  const navigate=useNavigate()

  const user = useSelector((state) => state.user.user);
  const Patient = "Patient Details";
  const Doctor = "Doctor Details";


  const handleAppointment=async()=>{
    try {
      const res=await axios.post('/create-checkout-session',{doctorData,user,slot})
      if(res.data.url){
        window.location.href=res.data.url
      }

    } catch (error) {
      navigate(-1)
    }

  }

  const handleback=()=>{
    navigate(-1)
  }

  return (
    <div className="global">
      <div className="user-card-container">
        <BookingCard user={user} title={Patient} />
        <BookingCard user={doctorData} title={Doctor} />
      </div>
      <div className="bookingPart">
        <div>
            <h2>Booking Details</h2>
            <br />
            <p>Time:{slot}</p>
            <p>Fees:{doctorData?.offlineFee} Rs</p>
            <p>Address:{doctorData.street},{doctorData.city}</p>
        </div>
        <div>
        <button className="bookButton" onClick={handleAppointment}>Confirm Appointment</button>
        <button  onClick={handleback}>Go Back</button>
        </div>

      </div>
    </div>
  );
};

export default Booking;
