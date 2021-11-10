import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';
import { editRobot } from '../../helpers/data/robotData';

export default function EditRobotForm({ setEditing, robotCategories, ...robotToEdit }) {
  const [robot, setRobot] = useState({
    categoryId: robotToEdit?.categoryId,
    imageUrl: robotToEdit?.imageUrl,
    title: robotToEdit?.title,
    price: robotToEdit?.price,
    description: robotToEdit?.description,
    available: robotToEdit?.available,
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    editRobot(robotToEdit.id, robot).then(() => setEditing(false));
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
    </Form>
  );
}

EditRobotForm.propTypes = {
  robotCategories: PropTypes.any,
  robotToEdit: PropTypes.object,
  setEditing: PropTypes.func,
};
