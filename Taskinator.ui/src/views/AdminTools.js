import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardTitle,
} from 'reactstrap';
import CreateRobotForm from '../components/forms/CreateRobotForm';
import EditRobot from '../components/forms/EditRobot';
import {
  getAvailableRobotsAlphabetically, getSingleRobot, getUnavailableRobotsAlphabetically
} from '../helpers/data/robotData';

export default function AdminTools() {
  const [robotToEdit, setRobotToEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const [robots, setRobots] = useState([]);
  const [unavailableRobots, setUnavailableRobots] = useState([]);
  // Sorting the robots alphabetically for easy viewing
  useEffect(() => {
    getUnavailableRobotsAlphabetically().then(setUnavailableRobots);
    getAvailableRobotsAlphabetically().then(setRobots);
  }, [editing]);
  return (
    <div className='admin-view-container'>
      <h2 className='text-center admin-tools-header'>Admin Tools</h2>
      <CreateRobotForm />
      {
        editing ? <EditRobot robotToEdit={robotToEdit} setEditing={setEditing}/> : ''
      }
      <h3 className='text-center available-robots-h3'>Available Robots</h3>
      <AvailableRobots setEditing={setEditing} setRobotToEdit={setRobotToEdit} robots={robots}/>
      <h3 className='text-center available-robots-h3'>Unavailable Robots</h3>
      <UnavailableRobots setEditing={setEditing} unavailableRobots={unavailableRobots}/>
    </div>
  );
}
function AvailableRobots({ setRobotToEdit, setEditing, robots }) {
  return (
    <div className='admin-robot-cont'>
      {
      robots.map((robot) => <AdminRobotCard key={robot.id} setEditing={setEditing} setRobotToEdit={setRobotToEdit} {...robot}/>)
      }
    </div>

  );
}
function UnavailableRobots({ unavailableRobots }) {
  return (
    <div className='admin-robot-cont'>
      {
      unavailableRobots.map((robot) => <AdminRobotCard key={robot.id} {...robot}/>)
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
  setRobotToEdit: PropTypes.func,
  robots: PropTypes.array
};
EditRobot.propTypes = {
  robotToEdit: PropTypes.object,
  setEditing: PropTypes.func,
};
UnavailableRobots.propTypes = {
  unavailableRobots: PropTypes.array,
};
