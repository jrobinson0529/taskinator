import React, { useEffect, useState } from 'react';
import { CardGroup } from 'reactstrap';
import { getRandomRobots } from '../helpers/data/robotData';

function RandomRobotsContainer() {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    getRandomRobots().then(setRobots);
  }, []);
  return (
    <CardGroup>
      {
        robots?.map((robot) => (
        <RobotCard key={robot.id} {...robot}/>
        ))
      }
    </CardGroup>
  );
}
function RobotCard({ ...robot }) {
  return (
    <div style={{
      width: 100,
      height: 100,
      color: 'white',
      fontSize: 12,
    }} className='m-5'>
      <p>{robot.title}</p>
      <img src='https://www.nicepng.com/png/full/155-1550002_pixel-robot-png-cartoon.png' alt="" style={{
        width: 100,
        height: 100,
        color: 'white',
        fontSize: 12,
      }}/>
    </div>
  );
}

export default RandomRobotsContainer;
