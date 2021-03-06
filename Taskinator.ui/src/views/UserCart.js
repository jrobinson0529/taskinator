import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CardLink } from 'reactstrap';
import {
  createCart, getCartItem, getMappableRobotInfoFromOrderId, getSubTotalFromOrderId
} from '../helpers/data/orderData';
import CartCard from '../components/CartCard';
import PaymentForm from '../components/forms/PaymentForm';
import OrderHisotry from '../components/order-history-view/OrderHistory';

export default function UserCart({ user, setUser }) {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState();
  const [openCheckoutForm, setOpenCheckoutForm] = useState();
  const [openOrderHistroy, setOpenOrderHistory] = useState(false);
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

  const handleClick = (e) => {
    e.preventDefault();
    setOpenCheckoutForm((prevState) => ({
      ...prevState,
    }));
  };

  const handleOpenHistory = () => {
    setOpenOrderHistory((prevState) => !prevState);
  };

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
          <h1>Total for this order: $ {subTotal?.total}</h1>
        <Button onClick={handleClick}>Checkout</Button>
        {openCheckoutForm
          && <PaymentForm user={user} setUser={setUser} cart={cart} setCart={setCart} subTotal={subTotal}/>
        }
        </div>
      }
      <CardLink href='#' onClick={() => handleOpenHistory()}>
        { openOrderHistroy ? 'Close Order History' : 'Order History'}
      </CardLink>
      {openOrderHistroy && <OrderHisotry user={user}/>}
      </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
