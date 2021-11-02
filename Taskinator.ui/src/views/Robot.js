import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleRobot } from '../helpers/data/robotData';

export default function Robot() {
  const [robot, setRobot] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleRobot(id).then(setRobot);
  }, []);

  return (
    <div className="singleRobotContainer">
      <img src={robot.imageUrl} className="singleRobotImg" alt="image of robot"/>
      <h1 className="singleRobotTitle">{robot.title}</h1>
      <h2 className="singleRobotPrice">Price: ${robot.price} per day</h2>
      <h3 className="singleRobotDescription">{robot.description}</h3>
    </div>
  );
}
