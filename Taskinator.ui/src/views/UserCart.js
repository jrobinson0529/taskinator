import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import {
  createCart, getCartItem, getMappableRobotInfoFromOrderId, getSubTotalFromOrderId
} from '../helpers/data/orderData';
import CartCard from '../components/CartCard';

export default function UserCart({ user }) {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState();
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
        getMappableRobotInfoFromOrderId(response.id).then((cartObj) => setCart(cartObj));
        getSubTotalFromOrderId(response.id).then((total) => setSubTotal(total));
      }
    });
  }, []);
  return (
    <div className="full-height-section">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cart.length === 0 && <h2>No Orders</h2>}
      <div className="cart-container">
      {cart?.map((cartItem) => (
        <CartCard key={cartItem.robotOrder?.id}
          {...cartItem}
          setCart={setCart}
          setSubTotal={setSubTotal}
        />
      ))}
      </div>
      {cart.length !== 0
        && <div className='order-total-container'>
          <h1 className="cart-total">Total for this order: $ {subTotal?.total}</h1>
          <Button className="checkout-button">Checkout</Button>
        </div>
        }
      </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
};
