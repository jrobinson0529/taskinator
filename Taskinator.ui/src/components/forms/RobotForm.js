import React, { useState } from 'react';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';
import { createRobot } from '../../helpers/data/robotData';

export default function RobotForm() {
  const [robot, setRobot] = useState({
    // id: '',
    categoryId: '',
    imageUrl: '',
    title: '',
    price: '',
    description: '',
    available: true,
  });
  const robotTypes = ['Cooking', 'Cleaning', 'Lawn Care', 'Murdering'];
  // const availability = [0, 1];
  const handleInputChange = (e) => {
    setRobot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'categoryId' ? e.target.selected : e.target.value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createRobot(robot).then((response) => console.warn(response));
  };
  return (
    <Form
      id='robotForm'
      autoComplete='off'
      onSubmit={handleSubmit}
      className='p-5'>
      <Label>INFORMATION</Label>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="robotTitle">TITLE</Label>
            <Input
              type="text"
              name="title"
              id="robotTitle"
              placeholder="MURDERBOT"
              value={robot.title}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="price">PRICE</Label>
            <Input
              type="number"
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
        <Label for="category">CATEGORY</Label>
            <Input
              type="select"
              name="categoryId"
              value={robot.categoryId}
              onChange={handleInputChange}
              id="selectCategory">
              <option value="">SELECT CATEGORY</option>
              {robotTypes.map((robotType) => (
                <option key={robotType}>{robotType}</option>
              ))};
        </Input>
      </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="url">PRODUCT IMAGE</Label>
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
      {/* <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="available">Available</Label>
            <Input
              type="select"
              name="available"
              value={robot.available}
              onChange={handleInputChange}
              id="availability">
              <option value="">Availability</option>
              {availability.map((avail) => (
                <option key={availability}>{avail}</option>
              ))};
        </Input>
        </FormGroup>
        </Col>
      </Row> */}
      <FormGroup>
        <Label for="description">DESCRIPTION</Label>
        <Input
          type="textarea"
          name="description"
          id="robotDescription"
          value={robot.description}
          onChange={handleInputChange}
          placeholder="murder murder murder murder"
        />
      </FormGroup>
      <Button>Add Robot</Button>
    </Form>
  );
}
