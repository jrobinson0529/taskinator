import React from 'react';
import HeroImage from '../components/HeroImage';
import RobotForm from '../components/forms/RobotForm';
import PaymentForm from '../components/forms/PaymentForm';
import ProfileForm from '../components/forms/ProfileForm';

function Home() {
  return (
    <>
      <HeroImage/>
      <RobotForm />
      <PaymentForm />
      <ProfileForm />
    </>
  );
}
Home.propTypes = {
};

export default Home;