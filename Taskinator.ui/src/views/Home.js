import React from 'react';
import PropTypes from 'prop-types';
import RobotForm from '../components/forms/RobotForm';
import PaymentForm from '../components/forms/PaymentForm';
import ProfileForm from '../components/forms/ProfileForm';
import AboutUs from '../components/AboutUs';

function Home({ time }) {
  return (
    <>
      <h1>Welcome to home</h1>
      <h3>{time}</h3>
      <RobotForm />
      <PaymentForm />
      <ProfileForm />
      <AboutUs />
    </>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
