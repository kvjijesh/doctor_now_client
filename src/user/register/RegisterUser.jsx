import React from 'react'
import Header from '../../components/header/Header'
import Register from '../../pages/register/Register'

export const RegisterUser = () => {
    const userType='user'
  return (
    <>
    <Header/>
    <Register userType={userType}/>
    </>
  )
}
