import React from 'react';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';

export default function RobotForm() {
  return (
    <Form className='p-5'>
      <Label>INFORMATION</Label>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="robotTitle">TITLE</Label>
            <Input type="text" name="robotTitle" id="robotTitle" placeholder="MURDERBOT" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="price">PRICE</Label>
            <Input type="price" name="price" id="robotPrice" placeholder="150.00" />
          </FormGroup>
        </Col>
      </Row>
            <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="category">CATEGORY</Label>
          <Input type="select" name="robotCategory" id="selectCategory">
          <option value="">SELECT CATEGORY</option>
          <option>CLEANING</option>
          <option>LAWN CARE</option>
          <option>COOKING</option>
          <option>MURDERING</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="url">PRODUCT IMAGE</Label>
            <Input type="url" name="robotImage" id="robotImage" placeholder="google.com" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="description">DESCRIPTION</Label>
        <Input type="textarea" name="robotDescription" id="robotDescription" />
      </FormGroup>
      <Button>Add Robot</Button>
    </Form>
  );
}
