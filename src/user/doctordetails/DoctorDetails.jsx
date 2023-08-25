import React from "react";
import Header from "../../components/header/Header";
import "./doctordetails.scss";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const navigate = useNavigate();

  const handleBook = async (slot) => {
    navigate("/book-appointment", {
      state: { doctorData: doctorData, slot: slot },
    });
  };

  return (
    <>
      <Header />
      <div className="detail-heading">
        <h2>BOOKING DETAILS</h2>
      </div>
      <div className="detail-container">
        <div className="detail-card">
          <div className="profile">
         {doctorData?.image?(<img
              className="profile-image"
              src={`http://localhost:8000/images/${doctorData?.image}`}
              alt="Profile"
            />):(<img
              className="profile-image"
              src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
              alt="Profile"
            />)}
            <div className="profile-details">
              <h2>{doctorData?.name}</h2>
              <p>{doctorData?.specialisation}</p>
              <p>{doctorData?.qualification}</p>
              <p>Rs.{doctorData?.offlineFee} Fee</p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-heading">
        <h2>AVAILABLE SLOTS</h2>
      </div>
      <div className="slot-container">
        <div className="available-slots">

            {doctorData?.availableSlots.length===0?(<p>No slots available</p>):(doctorData?.availableSlots.map((slot,index)=>( <div
                key={index}
                className="inner-slots"
                onClick={() => handleBook(slot)}
              >
                {slot}
              </div>)))}

          </div>

      </div>
    </>
  );
};

export default DoctorDetails;
