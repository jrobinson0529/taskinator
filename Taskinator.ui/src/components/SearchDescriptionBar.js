import React, { useState, useEffect } from 'react';
import { getRobots } from '../helpers/data/robotData';
import RobotCard from './RobotCard';

const SearchDescriptionBar = () => {
  const [robots, setRobots] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const BarStyling = {
    width: '20rem', background: '#F2F1F9', border: 'none', padding: '0.5rem'
  };

  useEffect(() => {
    getRobots().then((response) => {
      setRobots(response);
    });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setFilteredData(
        robots.filter((robot) => robot.description.toLowerCase().split(' ').includes(e.target.value.toLowerCase()))
      );
    }
  };
  return (
    <div>
    <input
     style={BarStyling}
     placeholder={'Search Robots by Description'}
     onKeyDown={handleKeyDown}
    />
    <div className="search-robots">
      {
        filteredData.map((robot) => (
        <RobotCard key={robot.id} {...robot}/>
        ))
      }
    </div>
    </div>
  );
};

export default SearchDescriptionBar;
