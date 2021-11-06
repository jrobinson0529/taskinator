import React from 'react';
import PropTypes from 'prop-types';
import RandomRobotsContainer from '../components/RandomRobotsContainer';
import HeroImage from '../components/HeroImage';
import AboutUs from '../components/AboutUs';

function Home() {
  return (
    <>
      <HeroImage/>
      <AboutUs />
      <h2>Check it out!</h2>
      <RandomRobotsContainer />
    </>
  );
}

export default Home;

Home.propTypes = {
  user: PropTypes.any
};
