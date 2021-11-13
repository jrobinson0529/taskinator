import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  Card, CardBody, CardText, CardTitle
} from 'reactstrap';

export default function UserCheckout({ user }) {
  const { id } = useParams();

  return (
    <div className="full-height-section">
      <Card className="bg-dark">
        <CardTitle>{user.firstName}, thank you for ordering bots!</CardTitle>
        <CardBody>Your bots are on their way!</CardBody>
        <CardText>Order ID: { id }</CardText>
      </Card>
    </div>
  );
}

UserCheckout.propTypes = {
  user: PropTypes.any
};
