import React from 'react';
import PropTypes from 'prop-types';
import AboutUs from '../components/AboutUs';

function Home({ time }) {
  return (
    <>
      <h1>Welcome to home</h1>
      <h3>{time}</h3>
      <AboutUs />
    </>
  );
}
Home.propTypes = {
  time: PropTypes.string
};

export default Home;
