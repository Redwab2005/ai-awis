import React, { useState } from "react";
import Hero from "../components/Hero";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import SubscriptionTable from "../components/Subscription_Table";
import SubscriptionGateway from "../components/SubscriptionGateway";
import Footer from "../components/Footer";
import Header from "../components/header";
import { useUser } from "../hook/useUser";

const Home = () => {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [gatewayMode, setGatewayMode] = useState("subscribe"); // 'subscribe' | 'cancel'
  const { user } = useUser();

  const handlePremiumClick = () => {
    console.log("[Home] Go Premium 1clicked");
    setGatewayMode("subscribe");
    setIsSubscriptionOpen(true);
  };

  const handleCloseSubscription = () => {
    setIsSubscriptionOpen(false);
  };

  const handleSubscribe = (plan, paymentMethod) => {
    // This would integrate with actual payment processing
    console.log(`Subscribing to ${plan} plan with ${paymentMethod} payment method`);
    // Close the sidebar after successful subscription
    setIsSubscriptionOpen(false);
    // Toast notification is handled in the SubscriptionGateway component
  };

  const handleCancelSubscription = () => {
    console.log("[Home] Manage (cancel) clicked");
    setGatewayMode("cancel");
    setIsSubscriptionOpen(true);
  };

  return (
    <>
      <Header />
      <Hero />
      <AiTools />
      <Testimonial />
      <SubscriptionTable 
        onPremiumClick={handlePremiumClick} 
        user={user}
        onCancelSubscription={handleCancelSubscription}
      />
      <Footer />
      
      {/* Subscription Gateway Sidebar */}
      <SubscriptionGateway
        isOpen={isSubscriptionOpen}
        onClose={handleCloseSubscription}
        onSubscribe={handleSubscribe}
        mode={gatewayMode}
      />
    </>
  );
};
export default Home;
