import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Col, Container, Row
} from 'reactstrap';
import RobotCard from '../components/RobotCard';
import ServicesHero from '../components/ServicesHero';
import { getRobotCategories } from '../helpers/data/robotCategoryData';
import { getRobotByCategory } from '../helpers/data/robotData';

function Services() {
  const [robots, setRobots] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getRobotCategories().then(setRobots);
  }, []);
  const [cookingRobots, setCookingRobots] = useState([]);
  const [choresRobots, setChoresRobots] = useState([]);
  const [murderRobots, setMurderRobots] = useState([]);
  const [lawnCareRobots, setLawnCareRobots] = useState([]);
  useEffect(() => {
    getRobotByCategory('7aaf5030-971c-4d5c-abcf-d95ebd418ee3').then(setCookingRobots);
  }, []);
  useEffect(() => {
    getRobotByCategory('5b8edfe1-6001-4080-8464-f04d893d1fb0').then(setMurderRobots);
  }, []);
  useEffect(() => {
    getRobotByCategory('7cb84331-6135-40ee-9806-60cebd755f1f').then(setChoresRobots);
  }, []);
  useEffect(() => {
    getRobotByCategory('f81a7280-8b3e-4865-8568-9ada95b19b17').then(setLawnCareRobots);
  }, []);
  return (
    <>
    <ServicesHero
      cookingRobotsLength={cookingRobots.length}
      choresRobotsLength={choresRobots.length}
      murderRobotsLength={murderRobots.length}
      lawnCareRobotsLength={lawnCareRobots.length}
      />
    <div className="feat-services-cont">
      <h2>Featured Robots</h2>
      <Container>
        <Row>
          <Col sm={2}>
            <Button color="link" onClick={() => history.push(`/services/${robots[2].id}`)} id="cooking">Cooking</Button>
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
          <Button color="link" onClick={() => history.push(`/services/${robots[0].id}`)} id="chores">Chores</Button>
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
          <Button color="link" onClick={() => history.push(`/services/${robots[1].id}`)} id="lawn-care">Lawn Care</Button>
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
          <Button color="link" onClick={() => history.push(`/services/${robots[3].id}`)} id="murdering">Murdering</Button>
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
