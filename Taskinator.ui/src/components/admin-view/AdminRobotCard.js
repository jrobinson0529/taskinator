import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardBody, CardTitle,
} from 'reactstrap';
import { getSingleRobot } from '../../helpers/data/robotData';

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
    {
      robot.available ? <Button className='bg-danger' id='remove-availability-btn'>Remove</Button>
        : <Button className='bg-success' id='add-availability-btn'>Add</Button>
    }
  </Card>
  );
}
AdminRobotCard.propTypes = {
  setEditing: PropTypes.func,
  setRobotToEdit: PropTypes.func
};

export default AdminRobotCard;
