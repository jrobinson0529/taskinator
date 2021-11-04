import React, { useState, useEffect } from 'react';
import {
  Form, FormGroup, Input, Button, Label
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getSingleRobot } from '../helpers/data/robotData';

export default function Robot() {
  const [robot, setRobot] = useState({
    dayQuantity: 0
  });
  const { id } = useParams();

  useEffect(() => {
    getSingleRobot(id).then(setRobot);
  }, []);

  const handleInputChange = (e) => {
    setRobot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'dayQuantity' ? e.target.selected : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn('hello');
  };

  return (
    <div className="singleRobotContainer">
      <img src={robot.imageUrl} className="singleRobotImg" alt="image of robot"/>
      <h1 className="singleRobotTitle">{robot.title}</h1>
      <h2 className="singleRobotPrice">Price: ${robot.price} per day</h2>
      <h3 className="singleRobotDescription">{robot.description}</h3>
      <Form id="robotSelectDayQuantityForm">
        <FormGroup>
          <Label for="dayQuantity">QUANTITY OF DAYS</Label>
          <Input
              type="select"
              name="dayQuantity"
              onChange={handleInputChange}
              id="selectDayQuantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </Input>
        </FormGroup>
      <Button onClick={handleSubmit}>ADD TO CART</Button>
      </Form>
    </div>
  );
}
