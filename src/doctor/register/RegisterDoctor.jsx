import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Register from '../../pages/register/Register';
import { useNavigate } from 'react-router-dom';

const RegisterDoctor = () => {
    const userType="doctor";
    const navigate=useNavigate()
    useEffect(() => {
      const authToken = localStorage.getItem("dtoken");
      if (authToken) {
        navigate('/doctorhome')
      }
    }, [navigate]);
  return (
    <>
        <Header userType={userType}/>
        <Register userType={userType}/>
    </>
  )
}

export default RegisterDoctor