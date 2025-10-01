import React from "react";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import SubscriptionTable from "../components/Subscription_Table";
import Footer from "../components/Footer";
import Header from "../components/header";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <AiTools />
      <Testimonial />
      <SubscriptionTable />
      <Footer />
    </>
  );
};
export default Home;
