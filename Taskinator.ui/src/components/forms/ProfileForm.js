import React from 'react';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';

export default function ProfileForm() {
  const countries = ['United States', 'Mexico', 'Canada'];
  return (
    <Form className='p-5'>
      <Label>Information</Label>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="address">ADDRESS</Label>
            <Input type="text" name="address" id="address" placeholder="156 Moonshine Dr" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="username">USERNAME</Label>
            <Input type="text" name="username" id="username" placeholder="murderbot" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="city">CITY</Label>
            <Input type="text" name="city" id="city" placeholder="12345" />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="zipcode">ZIPCODE</Label>
            <Input type="text" name="zipcode" id="zipcode" placeholder="Nashville" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="url">PROFILE IMAGE</Label>
            <Input type="url" name="profileImage" id="profileImage" placeholder="murderbots.com" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="country">COUNTRY</Label>
            <Input type="select" name="country" id="country">
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Button>SUBMIT</Button>
    </Form>
  );
}
