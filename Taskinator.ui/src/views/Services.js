import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Col, Container, Row
} from 'reactstrap';
import RobotCard from '../components/RobotCard';
import ServicesHero from '../components/ServicesHero';
import { getRobotByCategory } from '../helpers/data/robotData';

function Services({ ...robots }) {
  const [cookingRobots, setCookingRobots] = useState([]);
  useEffect(() => {
    getRobotByCategory('7aaf5030-971c-4d5c-abcf-d95ebd418ee3').then(setCookingRobots);
  }, []);
  const [choresRobots, setChoresRobots] = useState([]);
  useEffect(() => {
    getRobotByCategory('7cb84331-6135-40ee-9806-60cebd755f1f').then(setChoresRobots);
  }, []);
  const [lawnCareRobots, setLawnCareRobots] = useState([]);
  useEffect(() => {
    getRobotByCategory('f81a7280-8b3e-4865-8568-9ada95b19b17').then(setLawnCareRobots);
  }, []);
  const [murderRobots, setMurderRobots] = useState([]);
  useEffect(() => {
    getRobotByCategory('5b8edfe1-6001-4080-8464-f04d893d1fb0').then(setMurderRobots);
  }, []);

  const history = useHistory();
  const handleClick = () => {
    history.push(`/services/${robots.categoryId}`);
  };

  return (
    <>
    <ServicesHero/>
    <div className="feat-services-cont">
      <h2>Featured Robots</h2>
      <Container>
        <Row>
          <Col sm={2}>
            <Button onClick={() => handleClick()}>Cooking</Button>
          </Col>
          <Col sm={10}>
            <div className='robot-services-group'>
              {
                cookingRobots?.slice(0, 4).map((robot) => (
                <RobotCard key={robot.id} {...robot}/>
                ))
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <h3>Chores</h3>
          </Col>
          <Col sm={10}>
              <div className='robot-services-group'>
            {
              choresRobots?.slice(0, 4).map((robot) => (
              <RobotCard key={robot.id} {...robot}/>
              ))
            }
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <h3>Lawn Care</h3>
          </Col>
          <Col sm={10}>
          <div className='robot-services-group'>
        {
          lawnCareRobots?.slice(0, 4).map((robot) => (
          <RobotCard key={robot.id} {...robot}/>
          ))
        }
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <h3>Murder</h3>
          </Col>
          <Col sm={10}>
              <div className='robot-services-group'>
            {
              murderRobots?.slice(0, 4).map((robot) => (
              <RobotCard key={robot.id} {...robot}/>
              ))
            }
          </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default Services;
