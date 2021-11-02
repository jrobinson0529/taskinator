import React, { useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import CookingRobotsContainer from '../components/CookingRobotsContainer';
import { getRobotByCategory } from '../helpers/data/robotData';

export default function SingleService() {
  const { categoryId } = useParams();

  useEffect(() => {
    getRobotByCategory(categoryId);
  }, []);

  return (
    <>
    <CookingRobotsContainer/>
      <h2>Am I working?</h2>
    </>
  );
}
