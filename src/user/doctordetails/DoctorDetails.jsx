import Header from "../../components/header/Header";
import "./doctordetails.scss";
import { useLocation } from "react-router-dom";


const DoctorDetails = () => {
  const location = useLocation();
  const doctorData = location.state?.doctorData;

console.log(doctorData)

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
            </div>
          </div>
        </div>
        <div className="available-slots">
          <div className="slot">
            <div className="inner-slots">Date & Time</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
