import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle
} from 'reactstrap';
import { getCartItem, getMappableRobotInfoFromOrderId } from '../helpers/data/orderData';

export default function CartCard({ user }) {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    getCartItem(user.id).then((response) => {
      if (response) {
        getMappableRobotInfoFromOrderId(response.id).then((data) => setCartItem(data));
      }
    });
  }, []);
  console.warn(cartItem);
  return (
    <div>
      <Card className='bg-primary'>
        <CardBody>
          <CardTitle>{user.id}&apos; cart</CardTitle>
          {cartItem.map((x) => (
            <div key={x.robotOrder?.id}>
              <h1>{x.robotsInformation?.title}</h1>
              <img src={x.robotsInformation?.imageUrl} />
              <p>Total for this robot: {x.robotOrder?.dayQuantity * x.robotsInformation?.price} dollars</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

CartCard.propTypes = {
  user: PropTypes.any
};
