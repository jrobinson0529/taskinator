import React, { useState, useEffect } from 'react';
import {
  Form, FormGroup, Input, Button, Label
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getSingleRobot } from '../helpers/data/robotData';

export default function Robot() {
  const [robot, setRobot] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleRobot(id).then(setRobot);
  }, []);

  const handleInputChange = (e) => {
    setRobot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(robot.dayQuantity);
  };

  return (
    <div className="singleRobotContainer full-height-section">
      <img src={robot.imageUrl} className="singleRobotImg" alt="image of robot"/>
      <h1 className="singleRobotTitle">{robot.title}</h1>
      <h2 className="singleRobotPrice">Price: {robot.price} per day</h2>
      <h3 className="singleRobotDescription">{robot.description}</h3>
      <Form id="robotSelectDayQuantityForm">
        <FormGroup>
          <Label for="dayQuantity">QUANTITY OF DAYS</Label>
          <Input
              type="select"
              name="dayQuantity"
              onChange={handleInputChange}
              id="selectDayQuantity">
              <option value="" hidden># of days needed?</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit}>ADD TO CART</Button>
      </Form>
    </div>
  );
}
