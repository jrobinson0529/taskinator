import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCartItem } from '../helpers/data/orderData';

export default function UserCart({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCartItem(user?.id).then((data) => setCart(data));
  }, []);
  return (
    <div>
      <h1>CART ITEM</h1>
      {cart.map((cartItem) => (
        <div key={cartItem.id}>
          <h6>{user.firstName}&apos;s cart</h6>
        </div>
      ))}
     </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any
};
