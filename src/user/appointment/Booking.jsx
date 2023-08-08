import React from "react";
import BookingCard from "./BookingCard";
import "./booking.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { toast } from "react-toastify";
import { appointmentData } from "../../features/user/appoinmentSlice";

const Booking = () => {
    const dispatch=useDispatch()
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const slot=location.state?.slot;
  const navigate=useNavigate()

  const user = useSelector((state) => state.user.user);
  const Patient = "Patient Details";
  const Doctor = "Doctor Details";
  const handleAppointment=async ()=>{
    try {
        const response=await axios.post('/confirm-appointment',{doctorData,user,slot})
        if(response.status===201){
            dispatch(appointmentData(response.data))
            toast.success('Booking confirmed',{position:toast.POSITION.TOP_CENTER})
            navigate('/booking-success')

        }

    } catch (error) {
        toast.error(`${error.message}`)
    }
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
        </div>

      </div>
    </div>
  );
};

export default Booking;
