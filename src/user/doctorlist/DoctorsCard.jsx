import { Button } from "@mui/material";
import "./doctorcard.scss";
import { useNavigate } from "react-router-dom";

const DoctorsCard = ({ doctorData }) => {

  const navigate = useNavigate()
  const imageUrl = `https://doctor-now-server-1.onrender.com/images/${doctorData?.image}`;
  const handleClick = () => {
    navigate('/doctor-details', { state: { doctorData: doctorData } })
  }

  return (
    <div className="card">
      <div className="card__title">{doctorData.name} </div>
      <div className="card__body">

        <p>{doctorData.specialisation?.name}</p>
        <p>{doctorData.city}</p>
        <p>{doctorData.state}</p>
        <p>{doctorData.pin}</p>
        <div className="card__image">
          {doctorData?.image ? (<img src={imageUrl} alt="doctor" />) : (<img src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg' alt="doctor" />)}
        </div>
        <Button variant="contained" color="success" onClick={handleClick}>
          Book
        </Button>
      </div>
    </div>
  );
};

export default DoctorsCard;
