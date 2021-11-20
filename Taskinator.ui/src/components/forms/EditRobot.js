import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Row, Label, FormGroup, Form, Input
} from 'reactstrap';
import { editRobot } from '../../helpers/data/robotData';
import { getRobotCategories } from '../../helpers/data/robotCategoryData';

export default function EditRobot({ setEditing, robotToEdit }) {
  const [robot, setRobot] = useState({});
  const [robotCategories, setRobotCategories] = useState([]);
  useEffect(() => {
    setRobot({
      categoryId: robotToEdit?.categoryId,
      imageUrl: robotToEdit?.imageUrl,
      title: robotToEdit?.title,
      price: robotToEdit?.price,
      description: robotToEdit?.description,
      available: robotToEdit?.available,
    });
  }, [robotToEdit]);
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
  const DefaultOption = () => {
    const [category, setCategory] = useState();
    useEffect(() => {
      const singleCategory = robotCategories.filter((cat) => cat.id === robot.categoryId)[0];
      setCategory(singleCategory);
    }, [setEditing]);
    return (
      <option value={category?.id}>{category?.title}</option>
    );
  };
  useEffect(() => {
    getRobotCategories().then((response) => setRobotCategories(response));
  }, []);
  return (
    <Container>
        <Row>
          <Col>
            <h2>Editing</h2>
            <p>You are now editing</p>
          </Col>
          <Col>
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
              <DefaultOption />
              {robotCategories.map((category) => (
                <option key={category.id} value={category.id} def>{category.title}</option>
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
      <Button>Update Robot</Button>
    </Form>
          </Col>
        </Row>
      </Container>
  );
}

EditRobot.propTypes = {
  setEditing: PropTypes.func,
  robotToEdit: PropTypes.object,
};
