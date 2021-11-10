import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';
import { updateUser } from '../../helpers/data/userData';
import { finalizeOrder } from '../../helpers/data/orderData';

export default function PaymentForm({
  user, setUser, cart, subTotal, setCart
}) {
  const [additionalForm, setAdditionalForm] = useState(false);
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const year = new Date().getFullYear() - 1;
  const paymentType = ['Paypal', 'Visa', 'Mastercard', 'Amex', 'Venmo', 'GooglePay'];

  const [userObject, setUserObject] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    billingAddress: user?.billingAddress || '',
  });

  const [paymentObject, setPaymentObject] = useState({
    accountNumber: user.id,
    paymentType: 1
  });

  const finalizeOrderObj = {
    customerId: user.id,
    paymentId: cart[0].paymentId,
    orderTotal: subTotal.total
  };

  const cartInfo = {
    userId: user?.id,
    paymentId: 'eeaa9dae-3229-4190-ad73-70b25023aa73',
    orderTotal: 0,
  };

  const handleUserInputChange = (e) => {
    setUserObject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentInputChange = (e) => {
    setPaymentObject((prevState) => ({
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

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user.id, userObject).then((response) => setUser(response.data));
    // await addPayment(user.id, paymentObject).then((response) => console.warn(response));
    await finalizeOrder(cart[0].id, finalizeOrderObj, cartInfo).then((response) => setCart(response));
    await history.push(`/checkout/${user.id}`);
  };
  return (
    <>
    <Form className='p-5' onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
          <Label>Billing Info</Label>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">FIRST NAME</Label>
            <Input
              type="text"
              name="firstName"
              id="fullName"
              placeholder="John"
              value={userObject.firstName}
              onChange={handleUserInputChange}
              required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">LAST NAME</Label>
            <Input type="text" name="lastName" id="fullName" placeholder="Doe" value={userObject.lastName} onChange={handleUserInputChange} required />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for="address">ADDRESS</Label>
            <Input
              type="text" name="billingAddress" id="address" placeholder="497 Evergreen Rd." value={userObject.billingAddress} onChange={handleUserInputChange} required/>
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
              <Input type="text" name="cardNumber" id="cardNumber" placeholder="1234 5678 3456 2456" required/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="cardHolderName">CARDHOLDER NAME</Label>
              <Input type="text" name="cardHolderName" id="cardHolderName" placeholder="John Doe" required/>
            </FormGroup>
          </Col>
          </Row>
          <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="type">PAYMENT TYPE</Label>
                <Input
                  type="select"
                  name="paymentType"
                  id="paymentType"
                  placeholder="VISA"
                  onChange={handlePaymentInputChange}
                  value={paymentObject.paymentType}
                  required>
                {paymentType.map((pay) => (
                  <option key={pay.id}>{pay}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="cvv">CVV</Label>
              <Input type="text" name="cvv" id="cvv" placeholder="123" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="month">MONTH</Label>
              <Input type="select" name="month" id="month">
                {month.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="year">YEAR</Label>
              <Input type="select" name="year" id="year">
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
  user: PropTypes.any,
  setUser: PropTypes.func,
  cart: PropTypes.any,
  subTotal: PropTypes.any,
  setCart: PropTypes.func
};
