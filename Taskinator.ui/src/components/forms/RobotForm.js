import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, FormGroup, Label, Input, Button, UncontrolledAlert
} from 'reactstrap';
import { createRobot } from '../../helpers/data/robotData';

export default function RobotForm({ robotCategories }) {
  const [robot, setRobot] = useState({
    categoryId: '',
    imageUrl: '',
    title: '',
    price: '',
    description: '',
    available: '',
  });

  const [visible, setVisible] = useState(false);

  const handleInputChange = (e) => {
    setRobot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'categoryId' ? e.target.selected : e.target.value
    }));
  };

  const handleCheckChange = (e) => {
    setRobot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [visible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createRobot(robot).then((response) => setRobot(response));
    setVisible(true);
  };

  return (
    <Form
      id='robotForm'
      autoComplete='off'
      onSubmit={handleSubmit}
      className='robot-form'>
      <Label>INFORMATION</Label>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="robotTitle">Title</Label>
            <Input
              type="text"
              name="title"
              id="robotTitle"
              placeholder="Murderbot"
              value={robot.title}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type=""
              name="price"
              id="robotPrice"
              value={robot.price}
              onChange={handleInputChange}
              placeholder="150.00"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="category">Category</Label>
            <Input
              type="select"
              name="categoryId"
              onChange={handleInputChange}
              id="selectCategory">
              <option value="">Select Category</option>
              {robotCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))};
        </Input>
      </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="url">Product Image</Label>
            <Input
              type="url"
              name="imageUrl"
              id="robotImage"
              value={robot.imageUrl}
              onChange={handleInputChange}
              placeholder="google.com"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="robotDescription"
          value={robot.description}
          onChange={handleInputChange}
          placeholder="murder murder murder murder"
        />
      </FormGroup>
      <FormGroup check>
        <Input
          type="checkbox"
          name="available"
          id="availabile"
          checked={robot.available}
          onChange={handleCheckChange}
        />
        <Label check>
          Available
        </Label>
      </FormGroup>
      <Button>Add Robot</Button>
      {visible
        ? <div className="alert-container mt-3">
            <UncontrolledAlert id="alert" className="alert" color="dark" fade={true}>
              <p className="text-center">{robot.title} has been created!</p>
            </UncontrolledAlert>
          </div>
        : ''
      }
    </Form>
  );
}

RobotForm.propTypes = {
  robotCategories: PropTypes.any
};
