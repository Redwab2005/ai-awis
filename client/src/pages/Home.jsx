import React from 'react'
import Header from "../components/Header"; 
import Hero from "../components/Hero";
import AiTools from '../components/AiTools';
import Testimonial from '../components/Testimonial';
import SubscriptionTable from '../components/Subscription_Table';
import Footer from '../components/Footer';

const Home = () => {
  return (
    
    <>
      <Header/>
      <Hero/>
      <AiTools/>
      <Testimonial/>
      <SubscriptionTable/>
      <Footer/>
    </>
  );
}
export default Home;
