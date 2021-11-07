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
  console.warn(cart);
  return (
    <div className="full-height-section">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 && <h2>No Orders</h2>}
      <div className="cart-container">
      {cart?.map((cartItem) => (
        <CartCard key={cartItem.robotOrder?.id}
          {...cartItem}
          setCart={setCart}
          setSubTotal={setSubTotal}
        />
      ))}
      {cart.length !== 0
        && <div>
          <h1>Total for this order: $ {subTotal?.total}</h1>
          <Button>Order</Button>
        </div>
        }
      </div>
    </div>
  );
}

UserCart.propTypes = {
  user: PropTypes.any,
};

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { createCart, getCartItem } from '../helpers/data/orderData';
// import CartCard from '../components/CartCard';

// export default function UserCart({ user }) {
//   const [cart, setCart] = useState([]);
//   useEffect(() => {
//     getCartItem(user.id).then((response) => {
//       if (!response) {
//         const cartInfo = {
//           userId: user?.id,
//           paymentId: 'eeaa9dae-3229-4190-ad73-70b25023aa73',
//           orderTotal: 0,
//         };
//         createCart(cartInfo).then((cartObj) => setCart(cartObj));
//       } else {
//         getCartItem(user.id).then((res) => setCart(res));
//       }
//     });
//   }, []);
//   return (
//     <div className="full-height-section">
//       <h1>Your Shopping Cart</h1>
//       <CartCard user={user} cart={cart}/>
//     </div>
//   );
// }

// UserCart.propTypes = {
//   user: PropTypes.any,
// };
