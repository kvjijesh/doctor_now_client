import { Button } from "@mui/material";
import "./doctorcard.scss";
import { Link, useNavigate } from "react-router-dom";

const DoctorsCard = ({ doctorData }) => {
  const navigate=useNavigate()
  const imageUrl = `http://localhost:8000/images/${doctorData?.image}`;
  const handleClick=()=>{
    navigate('/doctor-details',{ state: { doctorData: doctorData }})
  }

  return (
    <div className="card">
      <div className="card__title">{doctorData.name} </div>
      <div className="card__body">
        <p>{doctorData.specialisation}</p>
        <p>{doctorData.city}</p>
        <p>{doctorData.pin}</p>
        <div className="card__image">
          <img src={imageUrl} alt="doctor" />
        </div>
        <Button variant="contained" color="success" onClick={handleClick}>
          Book
        </Button>
      </div>
    </div>
  );
};

export default DoctorsCard;
