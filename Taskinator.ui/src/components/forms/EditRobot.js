import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Row, Label, FormGroup, Form, Input
} from 'reactstrap';
import { deleteSingleRobot, editRobot, getRobotConnections } from '../../helpers/data/robotData';
import { getRobotCategories } from '../../helpers/data/robotCategoryData';

export default function EditRobot({ setEditing, robotToEdit }) {
  const [robot, setRobot] = useState({});
  const [canDelete, setCanDelete] = useState(false);
  const [robotCategories, setRobotCategories] = useState([]);

  useEffect(() => {
    setRobot({
      imageUrl: robotToEdit?.imageUrl,
      categoryId: robotToEdit?.categoryId,
      title: robotToEdit?.title,
      price: robotToEdit?.price,
      description: robotToEdit?.description,
      available: robotToEdit?.available,
    });
    getRobotConnections(robotToEdit.id).then((response) => {
      if (response.length === 0) { setCanDelete(true); } else { setCanDelete(false); }
    });
    getRobotCategories().then((response) => setRobotCategories(response));
  }, [robotToEdit, setEditing]);

  const handleInputChange = (e) => {
    setRobot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = (e) => {
    deleteSingleRobot(e.target.id).then(() => setEditing(false));
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
              value={robot.categoryId}
              id="selectCategory">
              {robotCategories.map((x) => (
                <option value={x.id} key={x.id}>{x.title}</option>
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
          id="available"
          checked={robot.available}
          onChange={handleCheckChange}
        />
        <Label check>
          Available
        </Label>
      </FormGroup>
      <Button>Update Robot</Button>
      { canDelete ? <Button className='bg-danger' id={robotToEdit?.id} onClick={handleClick}>Delete</Button> : <Button className='bg-danger' id={robotToEdit?.id} onClick={handleClick} disabled>Delete</Button> }
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
