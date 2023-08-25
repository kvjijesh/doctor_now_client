import axios from "../../Servies/axiosInterceptor";
import { useEffect, useState } from "react";
import "./doctorslist.scss";
import { toast } from "react-toastify";
import DoctorsCard from "./DoctorsCard";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

const DoctorsList = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // // const itemsPerPage = 1;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const displayedDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/available-doctors");
        if (response?.status === 200) {
          setDoctors(response.data);
          setAllDoctors(response.data);
          setIsLoading(false)
        }
      } catch (error) {
        toast.error(`${error.message}`);
      }
    })();
  }, []);

  const filterCards = (event) => {
    const value = event.target.value?.toLowerCase();
    const filteredDoctors = allDoctors.filter(
      (doctor) =>
        doctor.specialisation?.toLowerCase().includes(value) ||
        doctor.name?.toLowerCase().includes(value)
    );
    setDoctors(filteredDoctors);
  };

  return (
    <>
{isLoading?(<Spinner/>):(<>
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
    <div className="footer">
    <Footer />
    </div></>
)}

    </>
  );
};

export default DoctorsList;
