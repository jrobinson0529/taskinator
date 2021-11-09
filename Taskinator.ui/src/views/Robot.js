import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { getSingleRobot } from '../helpers/data/robotData';

export default function Robot() {
  const [robot, setRobot] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleRobot(id).then(setRobot);
  }, []);

  return (
    <div className="single-robot-cont">
      <Container>
        <Row>
          <Col>
            <img src={robot.imageUrl} className="singleRobotImg" alt="image of robot"/>
          </Col>
          <Col>
            <h1 className="singleRobotTitle">{robot.title}</h1>
            <h2 className="singleRobotPrice">Price: {robot.price} per day</h2>
            <p className="singleRobotDescription">{robot.description}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
