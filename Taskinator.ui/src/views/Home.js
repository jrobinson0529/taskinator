import React from 'react';
import PropTypes from 'prop-types';
// import RobotForm from '../components/forms/RobotForm';
// import PaymentForm from '../components/forms/PaymentForm';
// import ProfileForm from '../components/forms/ProfileForm';
import RandomRobotsContainer from '../components/RandomRobotsContainer';

function Home() {
  return (
    <>
      <h1>Welcome to home</h1>
      <RandomRobotsContainer />
      {/* <RobotForm />
      <PaymentForm />
      <ProfileForm /> */}
    </>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
