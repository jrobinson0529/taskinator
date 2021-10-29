import React, { useEffect, useState } from 'react';
import { getRandomRobots } from '../helpers/data/robotData';

function RandomRobotsContainer() {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    getRandomRobots().then(setRobots);
  }, []);
  return (
    <div className="container">
      {
        robots?.map((robot) => (
        <RobotCard key={robot.id} {...robot}/>
        ))
      }
    </div>
  );
}
function RobotCard(...robot) {
  return (
    <div>
      <image src={robot.imageUrl} alt=""/>
      {robot.title}
    </div>
  );
}

export default RandomRobotsContainer;
