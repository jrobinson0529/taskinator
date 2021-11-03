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
      <div className="form-group singleRobot-dropdown">
        <label>Day Quantity</label>
        <select className="form-control" id="singleRobot-select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <button type="button" className="btn btn-primary btn-lg">Add to Cart</button>
    </div>
  );
}
