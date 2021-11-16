/* eslint-disable no-sequences */
/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Form, Row, Col, FormGroup, Label, Input, Button
} from 'reactstrap';
import { updateUser } from '../../helpers/data/userData';
import { finalizeOrder } from '../../helpers/data/orderData';
import { addPayment, getAllPaymentType } from '../../helpers/data/paymentData';
import CreditCardForm from './CreditCardForm';

export default function PaymentForm({
  user, setUser, cart, subTotal, setCart
}) {
  const [additionalForm, setAdditionalForm] = useState(false);
  const [paymentType, setPaymentType] = useState([]);

  useEffect(() => {
    getAllPaymentType().then((response) => setPaymentType(response));
  }, []);

  const [userObject, setUserObject] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    billingAddress: user?.billingAddress || '',
    imageUrl: user?.imageUrl,
    dateCreated: user?.dateCreated,
    username: user?.username,
    email: user?.email,
    isAdmin: user?.isAdmin,
    googleId: user?.googleId
  });

  const [paymentObject, setPaymentObject] = useState({
    accountNumber: user?.id,
    paymentType: ''
  });

  const finalizeOrderObj = {
    customerId: user?.id,
    paymentId: cart[0]?.paymentId,
    orderTotal: subTotal?.total
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
    await updateUser(user?.id, userObject).then((response) => setUser(response.data));
    await addPayment(paymentObject, user?.id).then((response) => setPaymentType(response));
    await finalizeOrder(cart[0]?.id, finalizeOrderObj, cartInfo).then((response) => setCart(response));
    await history.push(`/checkout/${user?.id}`);
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
              value={userObject?.firstName}
              onChange={handleUserInputChange}
              required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">LAST NAME</Label>
            <Input type="text" name="lastName" id="fullName" placeholder="Doe" value={userObject?.lastName} onChange={handleUserInputChange} required />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for="address">ADDRESS</Label>
            <Input
              type="text" name="billingAddress" id="address" placeholder="497 Evergreen Rd." value={userObject?.billingAddress} onChange={handleUserInputChange} required/>
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={handleClick}>NEXT</Button>
      <div className="additional-form">
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
              <Label for="type">PAYMENT TYPE</Label>
                <Input
                  type="select"
                  name="paymentType"
                  id="paymentType"
                  placeholder="VISA"
                  onChange={handlePaymentInputChange}
                  value={paymentObject?.paymentType}
                  required>
                  <option>Select Payment Type</option>
                {paymentType?.map((pay, index) => (
                  <option key={index}>{pay}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
            { paymentObject.paymentType === 'Visa' ? <CreditCardForm/>
              : paymentObject.paymentType === 'Mastercard' ? <CreditCardForm/>
                : paymentObject.paymentType === 'Amex' ? <CreditCardForm/>
                  : paymentObject.paymentType === '' ? ''
                    : paymentObject.paymentType === 'Select Payment Type' ? ''
                      : <> <Label for="cardNumber">ACCOUNT NUMBER</Label>
                  <Input type="text" name="cardNumber" id="cardNumber" placeholder="1234 5678 3456 2456" required/> <Label for="cardHolderName">ACCOUNT HOLDER NAME</Label>
                  <Input type="text" name="cardHolderName" id="cardHolderName" placeholder="John Doe" required/> </> }
            </FormGroup>
          </Col>
        </Row>
          <Button>ORDER</Button>
        </>
      }
      </div>
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
