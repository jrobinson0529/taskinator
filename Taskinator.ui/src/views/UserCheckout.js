import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Card, CardText, CardTitle } from 'reactstrap';

export default function UserCheckout({ user }) {
  const { id } = useParams();

  return (
    <div>
      <Card className="bg-dark">
        <CardTitle>Thank you {user.firstName} for your order!</CardTitle>
        <CardText>Order ID: { id }</CardText>
      </Card>
    </div>
  );
}

UserCheckout.propTypes = {
  user: PropTypes.any
};
