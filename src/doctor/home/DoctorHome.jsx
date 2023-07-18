import React from 'react'
import Header from '../../components/header/Header'

const DoctorHome = () => {
    const userType="doctor"
  return (
    <>
    <Header userType={userType}/>
    <h1>Doctor Home</h1>
    </>
  )
}

export default DoctorHome