import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createCart, getCartItem } from '../helpers/data/orderData';
import CartCard from '../components/CartCard';

export default function UserCart({ user }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getCartItem(user.id).then((response) => {
      if (!response) {
        const cartInfo = {
          userId: user?.id,
          paymentId: 'eeaa9dae-3229-4190-ad73-70b25023aa73',
          orderTotal: 0,
        };
        createCart(cartInfo).then((cartObj) => setCart(cartObj));
      } else {
        getCartItem(user.id).then((res) => setCart(res));
      }
    });
  }, []);
  return (
    <div className="full-height-section">
      <h1>{cart.id}</h1>
      <CartCard user={user} cart={cart}/>
    </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
};
