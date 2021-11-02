import React, { useEffect, useState } from 'react';
import { getRobots } from '../helpers/data/robotData';
import RobotCard from './RobotCard';

function CookingRobotsContainer() {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    getRobots().then(setRobots);
  }, []);
  return (
    <div className='robot-card-group'>
      {
        robots?.map((robot) => (
        <RobotCard key={robot.id} {...robot}/>
        ))
      }
    </div>
  );
}

export default CookingRobotsContainer;
