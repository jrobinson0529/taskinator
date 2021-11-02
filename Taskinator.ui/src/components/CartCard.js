import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap';
import { getRobotFromOrderId } from '../helpers/data/orderData';

export default function CartCard({ cart }) {
  const [robotOrder, setRobotOrder] = useState([]);
  useEffect(() => {
    getRobotFromOrderId(cart[0].id).then((response) => setRobotOrder(response));
  }, []);

  return (
    <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/256/186"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        {robotOrder.id}
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        {robotOrder.id}
      </CardSubtitle>
      <CardText>
        {robotOrder.id}
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
  );
}

CartCard.propTypes = {
  cart: PropTypes.any
};
