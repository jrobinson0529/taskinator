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
    <div>
      <h1>{cart.id}</h1>
      <CartCard user={user} cart={cart}/>
    </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
};

// export default function UserCart({ user }) {
//   const [cart, setCart] = useState([]);
//   useEffect(() => {
//     getCartItem(user.id).then((response) => {
//       getDetailedOrderFromOrderId(response.id).then((cartObj) => setCart(cartObj));
//     });
//   }, []);
//   console.warn(cart);
//   return (
//     <div>
//       <h6>{user.firstName}&apos;s cart</h6>
//       <h1>CART</h1>
//       {cart.map((item) => (
//         <div key={item.robotOrderInfo.id}>
//           <h1>{item.robotInfo.title}</h1>
//           <img src={item.robotInfo.imageUrl} />
//           <label htmlFor="days">DAYS</label>
//             <select name="days" id="days">
//               <option>{item.robotOrderInfo.dayQuantity}</option>
//             </select>
//           <h2>{item.robotOrderInfo.dayQuantity} days</h2>
//           <h2>{item.robotInfo.price * item.robotOrderInfo.dayQuantity} dollars</h2>
//         </div>
//       ))}
//     </div>
//   );
// }
