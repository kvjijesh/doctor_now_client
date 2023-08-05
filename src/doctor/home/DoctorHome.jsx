import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import AddDetail from "../profile/AddDetail";
import Register from "../../pages/register/Register";

const DoctorHome = () => {
  const userType = "doctor";
  const doctorData = useSelector((state) => state.doctor.doctor);


  const [doctor, setDoctor] = useState("");

  useEffect(() => {}, []);

  return (
    <>
      {!doctorData?.is_submitted ? (
        <AddDetail />
      ) : (
        <>
          <Header userType={userType} />
          <div>
            
          </div>
        </>
      )}
    </>
  );
};

export default DoctorHome;
