import React from 'react'
import Hero from '../../components/hero/Hero'
import CardComponent from '../../components/card/CardComponent'
import Info from '../../components/info/Info'
import Header from '../../components/header/Header';
import './home.scss'




const Home = () => {
  return (
   <>
   <div className="home-container">
   <Header/>
   <Hero/>
   <Info/>
   </div>
   </>
  )
}

export default Home