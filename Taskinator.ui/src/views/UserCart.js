import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCartItem, getDetailedOrderFromOrderId } from '../helpers/data/orderData';

export default function UserCart({ user }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getCartItem(user.id).then((response) => {
      getDetailedOrderFromOrderId(response.id).then((cartObj) => setCart(cartObj));
    });
  }, []);
  return (
    <div>
      <h6>{user.firstName}&apos;s cart</h6>
      <h1>CART</h1>
      {cart.map((item) => (
        <div key={item.robotOrderInfo.id}>
          <h1>{item.robotInfo.title}</h1>
          <h2>{item.robotOrderInfo.dayQuantity} days</h2>
          <h2>{item.robotInfo.price * item.robotOrderInfo.dayQuantity} dollars</h2>
        </div>
      ))}
    </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
};
