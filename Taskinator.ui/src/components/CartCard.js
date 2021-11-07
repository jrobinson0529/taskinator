import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card, CardBody, CardTitle, Input
} from 'reactstrap';
import { getCartItem, getMappableRobotInfoFromOrderId, getSubTotalFromOrderId } from '../helpers/data/orderData';

export default function CartCard({ user }) {
  const [cartItem, setCartItem] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  useEffect(() => {
    getCartItem(user.id).then((response) => {
      if (response) {
        getMappableRobotInfoFromOrderId(response.id).then((data) => setCartItem(data));
        getSubTotalFromOrderId(response.id).then((total) => setSubTotal(total));
      }
    });
  }, []);

  const handleInputChange = (e) => {
    console.warn(e.target.value);
  };
  console.warn(cartItem);

  const handleClick = (type) => {
    if (type === 'delete') {
      console.warn('delete');
    }
  };
  return (
      <Card className='cart-card'>
        <CardBody>
        <CardTitle></CardTitle>
          <div className="cart-container">
          {cartItem.map((x) => (
            <div key={x.robotOrder?.id} className="individual-cart-card">
              <Button color="danger" onClick={() => handleClick('delete')}>Remove</Button>
              <h1>{x.robotsInformation?.title}</h1>
              <img src={x.robotsInformation?.imageUrl} />
              <Input
                type='select'
                name='days'
                id='dayQuantity'
                value={x.robotOrder.dayQuantity}
                onChange={handleInputChange}
              >
                {days.map((day) => (
                  <option defaultValue={x.robotOrder?.dayQuantity} key={day}>{day}</option>
                ))}
              </Input>
              <p>days</p>
              <p>Price is {x.robotsInformation?.price} dollars per day</p>
              <p>Total for this robot: {x.total} dollars</p>
            </div>
          ))}
        </div>
        <div>Total for this order: $ {subTotal.total}</div>
        <Button>Order</Button>
        </CardBody>
      </Card>
  );
}

CartCard.propTypes = {
  user: PropTypes.any
};
