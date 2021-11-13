import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle
} from 'reactstrap';

export default function UserCheckout({ user }) {
  return (
    <div className="full-height-section">
      <Card className="bg-dark">
        <CardTitle>{user.firstName}, thank you for ordering bots!</CardTitle>
        <CardBody>Your bots are on their way!</CardBody>
      </Card>
    </div>
  );
}

UserCheckout.propTypes = {
  user: PropTypes.any
};
