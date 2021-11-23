import React, { useState, useEffect } from 'react';
import { getRobotByCategory, getRobots } from '../helpers/data/robotData';
import RobotCard from './RobotCard';

const SearchBar = () => {
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
        robots.filter((robot) => robot.title.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }
  };
  const handleDescriptionSearch = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.toLowerCase().includes('lawn')) {
        getRobotByCategory('f81a7280-8b3e-4865-8568-9ada95b19b17').then((data) => setFilteredData(data));
      } else if (e.target.value.toLowerCase().includes('chore')) {
        getRobotByCategory('7cb84331-6135-40ee-9806-60cebd755f1f').then((data) => setFilteredData(data));
      } else if (e.target.value.toLowerCase().includes('friend')) {
        getRobotByCategory('7aaf5030-971c-4d5c-abcf-d95ebd418ee3').then((data) => setFilteredData(data));
      } else if (e.target.value.toLowerCase().includes('murder')) {
        getRobotByCategory('5b8edfe1-6001-4080-8464-f04d893d1fb0').then((data) => setFilteredData(data));
      } else {
        setFilteredData(
          robots.filter((robot) => robot.description.toLowerCase().includes(e.target.value.toLowerCase()))
        );
      }
    }
  };
  return (
    <div>
    <input
     style={BarStyling}
     placeholder={'Search Robots by Name'}
     onKeyDown={handleKeyDown}
      />
    <input className='search-description-bar'
     style={BarStyling}
     placeholder={'Search Robots by Keyword'}
     onKeyDown={handleDescriptionSearch}
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

export default SearchBar;
