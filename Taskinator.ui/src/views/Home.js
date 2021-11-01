import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RandomRobotsContainer from '../components/RandomRobotsContainer';
import HeroImage from '../components/HeroImage';
import AboutUs from '../components/AboutUs';
import RobotForm from '../components/forms/RobotForm';
import getRobotCategories from '../helpers/data/robotCategoryData';
import ProfileForm from '../components/forms/ProfileForm';

function Home({ user }) {
  const [robotCategories, setRobotCategories] = useState([]);
  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);
  return (
    <>
      <h1>Welcome to home</h1>
      <HeroImage/>
      <AboutUs />
      <h2>Check it out!</h2>
      <RandomRobotsContainer />

      <RobotForm robotCategories={robotCategories} />
      <ProfileForm user={user}/>

    </>
  );
}

export default Home;

Home.propTypes = {
  user: PropTypes.any
};
