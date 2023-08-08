import React from "react";
import Header from "../../components/header/Header";
import "./doctordetails.scss";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const navigate = useNavigate();

  const handleBook = async (slot) => {
    console.log(slot);
    navigate("/book-appointment", {
      state: { doctorData: doctorData, slot: slot },
    });
  };

  return (
    <>
      <Header />
      <div className="App1">
        <div className="card2">
          <div className="profile">
            <img
              className="profile-image"
              src={`http://localhost:8000/images/${doctorData?.image}`}
              alt="Profile"
            />
            <div className="profile-details">
              <h2>{doctorData?.name}</h2>
              <p>{doctorData?.specialisation}</p>
              <p>{doctorData?.qualification}</p>
              <p>Rs.{doctorData?.offlineFee} Fee</p>
            </div>
          </div>
        </div>

        <div className="available-slots">
          <div className="slot">
            {doctorData?.availableSlots.length === 0 ? (
              <p>No slots available</p>
            ) : (
              doctorData?.availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className="inner-slots"
                  onClick={() => handleBook(slot)}
                >
                  {slot}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
