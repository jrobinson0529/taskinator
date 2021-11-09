import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';

export default function PaymentForm({ user }) {
  const [additionalForm, setAdditionalForm] = useState(false);
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const year = new Date().getFullYear() - 1;
  const paymentType = ['Paypal', 'Visa', 'Mastercard', 'Amex', 'Venmo', 'GooglePay'];
  const [userObject, setUserObject] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    billingAddress: user?.billingAddress || '',
  });

  const handleInputChange = (e) => {
    setUserObject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setAdditionalForm((prevState) => ({
      ...prevState,
    }));
  };
  return (
    <>
    <Form className='p-5'>
      <Row>
        <Col md={12}>
          <Label>Billing Info</Label>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">FIRST NAME</Label>
            <Input type="text" name="firstName" id="fullName" placeholder="John" value={userObject.firstName} onChange={handleInputChange} required/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">LAST NAME</Label>
            <Input type="text" name="lastName" id="fullName" placeholder="Doe" value={userObject.lastName} onChange={handleInputChange} required />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for="address">ADDRESS</Label>
            <Input
              type="text" name="billingAddress" id="address" placeholder="497 Evergreen Rd." value={userObject.billingAddress} onChange={handleInputChange} required/>
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={handleClick}>NEXT</Button>
      {additionalForm
          && <>
          <Row>
            <Col md={12}>
              <Label>Payment Info</Label>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="cardNumber">CARD NUMBER / ACCOUNT NUMBER</Label>
              <Input type="number" name="cardNumber" id="cardNumber" placeholder="1234 5678 3456 2456" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="cardHolderName">CARDHOLDER NAME</Label>
              <Input type="text" name="cardHolderName" id="cardHolderName" placeholder="John Doe" onChange={handleInputChange} required/>
            </FormGroup>
          </Col>
          </Row>
          <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="type">PAYMENT TYPE</Label>
              <Input type="select" name="paymentType" id="paymentType" placeholder="VISA" onChange={handleInputChange} required>
                {paymentType.map((pay) => (
                  <option key={pay.value}>{pay}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="cvv">CVV</Label>
              <Input type="text" name="cvv" id="cvv" placeholder="123" onChange={handleInputChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="month">MONTH</Label>
              <Input type="select" name="month" id="month" onChange={handleInputChange}>
                {month.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="year">YEAR</Label>
              <Input type="select" name="year" id="year" onChange={handleInputChange}>
                {years.map((x) => (
                  <option key={year + x}>{year + x}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button>ORDER</Button>
        </>
      }
      </Form>
      </>
  );
}

PaymentForm.propTypes = {
  user: PropTypes.any
};
