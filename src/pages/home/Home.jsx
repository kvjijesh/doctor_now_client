import React from 'react'
import Hero from '../../components/hero/Hero'
import CardComponent from '../../components/card/CardComponent'
import Info from '../../components/info/Info'
import Header from '../../components/header/Header';
import './home.scss'
import TopSpeciality from '../../components/TopSpeciality';
import Topdoctors from '../../components/Topdoctors';
import { Divider } from '@mui/material';




const Home = () => {
  return (
   <>
   <div className="home-container">
   <Header/>
   <Hero/>
   <Info/>
   {/* <Divider sx={{mx:5,my:1}}/> */}
   <TopSpeciality/>
   {/* <Divider sx={{mx:5,my:1}}/> */}
   <Topdoctors/>
   </div>
   </>
  )
}

export default Home