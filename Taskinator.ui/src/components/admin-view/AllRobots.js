import React from 'react';
import PropTypes from 'prop-types';
import AdminRobotCard from './AdminRobotCard';

function AllRobots({ setRobotToEdit, setEditing, robots }) {
  return (
    <div className='admin-robot-cont'>
      {
      robots.map((robot) => <AdminRobotCard key={robot.id} setEditing={setEditing} setRobotToEdit={setRobotToEdit} {...robot}/>)
      }
    </div>

  );
}
AllRobots.propTypes = {
  setEditing: PropTypes.func,
  setRobotToEdit: PropTypes.func,
  robots: PropTypes.array
};
export default AllRobots;
