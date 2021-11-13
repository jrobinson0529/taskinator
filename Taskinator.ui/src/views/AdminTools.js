import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateRobotForm from '../components/forms/CreateRobotForm';
import EditRobot from '../components/forms/EditRobot';
import {
  getAllRobotsAlphabetically
} from '../helpers/data/robotData';
import AllRobots from '../components/admin-view/AllRobots';

export default function AdminTools() {
  const [robotToEdit, setRobotToEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const [robots, setRobots] = useState([]);
  // Sorting the robots alphabetically for easy viewing
  useEffect(() => {
    getAllRobotsAlphabetically().then(setRobots);
  }, [editing]);
  return (
    <div className='admin-view-container'>
      <h2 className='text-center admin-tools-header'>Admin Tools</h2>
      <CreateRobotForm />
      {
        editing ? <EditRobot robotToEdit={robotToEdit} setEditing={setEditing}/> : ''
      }
      <h3 className='text-center available-robots-h3'>Robots View</h3>
      <AllRobots setEditing={setEditing} setRobotToEdit={setRobotToEdit} robots={robots}/>
    </div>
  );
}
AdminTools.propTypes = {
  setEditing: PropTypes.func,
};
