import axios from "../../Servies/axiosInterceptor";
import { useEffect, useState } from "react";
import "./doctorslist.scss";
import { toast } from "react-toastify";
import DoctorsCard from "./DoctorsCard";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/available-doctors");
        if (response.status === 200) {
          setDoctors(response.data);
          setAllDoctors(response.data);
        }
      } catch (error) {
        toast.error(`${error.messAGE}`);
      }
    })();
  }, []);

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredDoctors = allDoctors.filter((doctor) =>
      `${doctor.specialisation} `.toLowerCase().includes(value)
    );
    setDoctors(filteredDoctors);
  };

  return (
    <div className="App">
      <h2 className="heading">Available Doctors</h2>
      <input
        className="search-box"
        onInput={filterCards}
        placeholder="Search..."
      />
      <div className="cards-container">
        {doctors.map((doctor, index) => (
          <DoctorsCard key={index} doctorData={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
