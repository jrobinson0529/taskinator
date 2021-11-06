import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RobotCard from '../components/RobotCard';
import { getRobotCategoriesById } from '../helpers/data/robotCategoryData';
import { getRobotByCategory } from '../helpers/data/robotData';

export default function SingleService() {
  const [robots, setRobots] = useState([]);
  const [robotTitle, setRobotTitle] = useState([]); // Possibly should rename to serviceTitle for readability
  const { categoryId } = useParams();

  useEffect(() => {
    getRobotByCategory(categoryId).then(setRobots);
  }, []);

  useEffect(() => {
    getRobotCategoriesById(categoryId).then(setRobotTitle);
  }, []);

  return (
    <>
    <h2 key={robotTitle.id}>{robotTitle.title} Robots</h2>
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
