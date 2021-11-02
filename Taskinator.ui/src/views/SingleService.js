import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RobotCard from '../components/RobotCard';
import { getRobotByCategory } from '../helpers/data/robotData';

export default function SingleService() {
  const [robots, setRobots] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    getRobotByCategory(categoryId).then(setRobots);
  }, []);

  return (
    <>
    <h1>Help</h1>
    <div className='robot-services-group'>
      {
        robots?.map((robot) => (
        <RobotCard key={robot.id} {...robot}/>
        ))
      }
    </div>
    </>
  );
}
