import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardTitle, Col, Container, Row
} from 'reactstrap';
import EditRobotForm from '../components/forms/EditRobotForm';
import RobotForm from '../components/forms/RobotForm';
import { getRobotCategories } from '../helpers/data/robotCategoryData';
import { getRobots, getSingleRobot, getUnavailableRobots } from '../helpers/data/robotData';

export default function AdminTools() {
  const [robotToEdit, setRobotToEdit] = useState({});
  const [editing, setEditing] = useState(false);
  return (
    <div className='admin-view-container'>
      <h2 className='text-center admin-tools-header'>Admin Tools</h2>
      <CreateRobot />
      {
        editing ? <EditRobot robotToEdit={robotToEdit} setEditing={setEditing}/> : ''
      }
      <h3 className='text-center available-robots-h3'>Available Robots</h3>
      <AvailableRobots setEditing={setEditing} setRobotToEdit={setRobotToEdit}/>
      <h3 className='text-center available-robots-h3'>Unavailable Robots</h3>
      <UnavailableRobots setEditing={setEditing}/>
    </div>
  );
}
function CreateRobot() {
  const [robotCategories, setRobotCategories] = useState([]);
  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);
  return (
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
  );
}
function EditRobot({ setEditing, robotToEdit }) {
  const [robotCategories, setRobotCategories] = useState([]);
  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);
  return (
    <Container>
        <Row>
          <Col>
            <h2>Editing</h2>
            <p>You are now editing</p>
          </Col>
          <Col>
            <EditRobotForm robotCategories={robotCategories} setEditing={setEditing} {...robotToEdit}/>
          </Col>
        </Row>
      </Container>
  );
}
function AvailableRobots({ setRobotToEdit, setEditing }) {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    getRobots().then((response) => {
      const sortedRobots = response.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      setRobots(sortedRobots);
    });
  }, []);
  return (
    <div className='admin-robot-cont'>
      {
      robots.map((robot) => <AdminRobotCard key={robot.id} setEditing={setEditing} setRobotToEdit={setRobotToEdit} {...robot}/>)
      }
    </div>

  );
}
function UnavailableRobots() {
  const [robots, setRobots] = useState([]);
  useEffect(() => {
    getUnavailableRobots().then((response) => {
      const sortedRobots = response.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      if (response) {
        setRobots(sortedRobots);
      }
    });
  }, []);
  return (
    <div className='admin-robot-cont'>
      {
      robots.map((robot) => <AdminRobotCard key={robot.id} {...robot}/>)
      }
    </div>

  );
}
function AdminRobotCard({ setRobotToEdit, setEditing, ...robot }) {
  const handleClick = (e) => {
    getSingleRobot(e.target.id).then((response) => {
      console.warn(e.target.id);
      setRobotToEdit(response);
      setEditing(true);
    });
  };

  return (
    <Card className='admin-robot-card'>
    <CardBody>
      <CardTitle tag="h5">
        {robot.title}
      </CardTitle>
    </CardBody>
    <Button className='bg-primary' onClick={handleClick} id={robot.id}>Edit</Button>
    <Button className='bg-danger'>X</Button>
  </Card>
  );
}
AdminTools.propTypes = {
  setEditing: PropTypes.func,
};
AdminRobotCard.propTypes = {
  setEditing: PropTypes.func,
  setRobotToEdit: PropTypes.func
};
AvailableRobots.propTypes = {
  setEditing: PropTypes.func,
  setRobotToEdit: PropTypes.func
};
EditRobot.propTypes = {
  robotToEdit: PropTypes.object,
  setEditing: PropTypes.func,
};
