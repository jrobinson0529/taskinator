import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';

export default function PaymentForm({ user }) {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const year = new Date().getFullYear() - 1;
  const countries = ['United States', 'Mexico', 'Canada'];
  const [userObject, setUserObject] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    billingAddress: user?.billingAddress || '',
  });

  const handleInputChange = () => {
    setUserObject((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <Form className='p-5'>
      <Row>
        <Col md={6}>
          <Label>Billing Info</Label>
        </Col>
        <Col md={6}>
          <Label>Credit Card Info</Label>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="firstName">FIRST NAME</Label>
            <Input type="text" name="fullName" id="fullName" placeholder="John" defaultValue={userObject.firstName} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="lastName">LAST NAME</Label>
            <Input type="text" name="fullName" id="fullName" placeholder="Doe" defaultValue={userObject.lastName} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="cardNumber">CARD NUMBER</Label>
            <Input type="number" name="cardNumber" id="cardNumber" placeholder="1234 5678 3456 2456" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="address">ADDRESS</Label>
            <Input
              type="text" name="address" id="address" placeholder="497 Evergreen Rd." defaultValue={userObject.billingAddress} onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="cardHolderName">CARDHOLDER NAME</Label>
            <Input type="text" name="cardHolderName" id="cardHolderName" placeholder="John Doe" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="city">CITY</Label>
            <Input type="text" name="city" id="city" placeholder="Roseville" />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="zipcode">ZIP CODE</Label>
            <Input type="text" name="zipcode" id="zipcode" placeholder="95673" />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="month">MONTH</Label>
            <Input type="select" name="month" id="month">
              {month.map((item) => (
                <option key={item.indexOf(item)}>{item}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="year">YEAR</Label>
            <Input type="select" name="year" id="year">
              {years.map((x) => (
                <option key={year}>{year + x}</option>
              ))}
            </Input>
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
        <Col md={3}>
          <FormGroup>
            <Label for="cvv">CVV</Label>
            <Input type="text" name="cvv" id="cvv" placeholder="123" />
          </FormGroup>
        </Col>
      </Row>
      <Button>ORDER</Button>
    </Form>
  );
}

PaymentForm.propTypes = {
  user: PropTypes.any
};
