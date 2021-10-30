import React from 'react';
import RandomRobotsContainer from '../components/RandomRobotsContainer';
import HeroImage from '../components/HeroImage';
import AboutUs from '../components/AboutUs';

function Home() {
  return (
    <>
      <h1>Welcome to home</h1>
      <HeroImage/>
      <AboutUs />
      <h2>Check it out!</h2>
      <RandomRobotsContainer />
    </>
  );
}

export default Home;
