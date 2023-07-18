import React from 'react'
import Header from '../../components/header/Header'
import Register from '../../pages/register/Register';

const RegisterDoctor = () => {
    const userType="doctor"
  return (
    <>
        <Header userType={userType}/>
        <Register userType={userType}/>
    </>
  )
}

export default RegisterDoctor