import React, { useState, useEffect } from 'react';
import RobotForm from '../components/forms/RobotForm';
import { getRobotCategories } from '../helpers/data/robotCategoryData';

export default function CreateRobot() {
  const [robotCategories, setRobotCategories] = useState([]);

  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);

  return (
    <div className="full-height-section">
      <RobotForm robotCategories={robotCategories} />
    </div>
  );
}
