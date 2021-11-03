import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RandomRobotsContainer from '../components/RandomRobotsContainer';
import HeroImage from '../components/HeroImage';
import AboutUs from '../components/AboutUs';
import RobotForm from '../components/forms/RobotForm';
import { getRobotCategories } from '../helpers/data/robotCategoryData';

function Home() {
  const [robotCategories, setRobotCategories] = useState([]);
  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);
  return (
    <>
      <HeroImage/>
      <AboutUs />
      <h2>Check it out!</h2>
      <RandomRobotsContainer />

      <RobotForm robotCategories={robotCategories} />

    </>
  );
}

export default Home;

Home.propTypes = {
  user: PropTypes.any
};
