import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCartItem } from '../helpers/data/orderData';

export default function UserCart({ user }) {
  const [cart, setCart] = useState([]);
  let { id } = useParams();
  id = user.id;

  useEffect(() => {
    getCartItem(id).then((data) => setCart(data));
  }, []);
  return (
    <div>
      <h1>CART ITEM</h1>
      {/* {cart.map((cartItem) => (
        <div key={cartItem.id}>{cartItem.id}</div>
        <CartItem />
      ))} */}
     </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
  id: PropTypes.string
};
