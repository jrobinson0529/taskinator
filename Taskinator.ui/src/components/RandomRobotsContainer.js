import React, { useEffect, useState } from 'react';
import { getRandomRobots } from '../helpers/data/robotData';
import RobotCard from './RobotCard';

function RandomRobotsContainer() {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    let subscription = true;
    getRandomRobots().then((response) => {
      if (subscription) {
        setRobots(response);
      }
    });
    return () => {
      subscription = false;
    };
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

export default RandomRobotsContainer;
