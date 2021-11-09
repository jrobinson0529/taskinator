import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Input, Button, Label, Col, Container, Row
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getSingleRobot } from '../helpers/data/robotData';
import { getCartItem } from '../helpers/data/orderData';
import addToCart from '../helpers/data/robotOrdersData';

export default function Robot({ user }) {
  const [robot, setRobot] = useState({});
  const [orderObject, setOrderObject] = useState({
    dayQuantity: 1
  });
  const [message, setMessage] = useState();
  const { id } = useParams();
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    getSingleRobot(id).then(setRobot);
    getCartItem(user?.id).then((response) => {
      setOrderObject((prevState) => ({
        ...prevState,
        robotId: id,
        orderId: response.id
      }));
    });
  }, []);

  const handleInputChange = (e) => {
    setOrderObject((prevState) => ({
      ...prevState,
      [e.target.name]: Number(e.target.value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(orderObject).then((response) => {
      if (response) {
        setMessage('Robot has been added to cart');
      }
    });
  };

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
          <h3 className="singleRobotDescription">{robot.description}</h3>
          <Form id="robotSelectDayQuantityForm">
            <FormGroup>
              <Label for="dayQuantity">QUANTITY OF DAYS</Label>
              <Input
                  type="select"
                  name="dayQuantity"
                  onChange={handleInputChange}
                  id="selectDayQuantity">
                {days.map((day) => (
                  <option defaultValue={orderObject.dayQuantity} key={day}>{day}</option>
                ))}
              </Input>
              </FormGroup>
            <Button onClick={handleSubmit}>ADD TO CART</Button>
            <h4>{message}</h4>
          </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Robot.propTypes = {
  user: PropTypes.any
};
