import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import RobotForm from '../components/forms/RobotForm';
import { getRobotCategories } from '../helpers/data/robotCategoryData';

export default function CreateRobot() {
  const [robotCategories, setRobotCategories] = useState([]);

  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);

  return (
    <div className="single-robot-cont">
      <Container>
        <Row>
          <Col>
            <h2>Add a New Robot!</h2>
            <p>Type in the information to add a new robot to the database. The robot will then show up publicly based on availablity.</p>
          </Col>
          <Col>
            <RobotForm robotCategories={robotCategories} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
