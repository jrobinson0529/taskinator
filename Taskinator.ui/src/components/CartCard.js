import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle, Input
} from 'reactstrap';
import { getCartItem, getMappableRobotInfoFromOrderId } from '../helpers/data/orderData';

export default function CartCard({ user }) {
  const [cartItem, setCartItem] = useState([]);
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  useEffect(() => {
    getCartItem(user.id).then((response) => {
      if (response) {
        getMappableRobotInfoFromOrderId(response.id).then((data) => setCartItem(data));
      }
    });
  }, []);
  console.warn(cartItem);
  return (
      <Card className='cart-card'>
        <CardBody>
          <CardTitle> </CardTitle>
          <div className="cart-container">
          {cartItem.map((x) => (
            <div key={x.robotOrder?.id} className="individual-cart-card">
              <h1>{x.robotsInformation?.title}</h1>
              <img src={x.robotsInformation?.imageUrl} />
              <Input type='select' value={x.robotOrder?.dayQuantity}>
                {days.map((day) => (
                  <option selected={x.robotOrder?.dayQuantity} key={day}>{day}</option>
                ))}
              </Input>
              <p>days</p>
              <p>Price is {x.robotsInformation?.price} dollars per day</p>
              <p>Total for this robot: {x.robotOrder?.dayQuantity * x.robotsInformation?.price} dollars</p>
            </div>
          ))}
          </div>
        </CardBody>
      </Card>
  );
}

CartCard.propTypes = {
  user: PropTypes.any
};
