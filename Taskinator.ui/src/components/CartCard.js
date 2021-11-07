import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card, CardBody, CardTitle, Input
} from 'reactstrap';
import { deleteRobotsOrder, getSubTotalFromOrderId, updateRobotOrder } from '../helpers/data/orderData';

export default function CartCard({
  robotOrder,
  robotsInformation,
  total,
  id,
  setCart,
  setSubTotal
}) {
  const [duration, setDuration] = useState({
    dayQuantity: robotOrder.dayQuantity
  });
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const handleClick = async (type) => {
    if (type === 'delete') {
      await deleteRobotsOrder(robotOrder.id, id).then((response) => setCart(response));
      await getSubTotalFromOrderId(id).then((res) => setSubTotal(res));
    }
  };

  const handleInputChange = async (e) => {
    setDuration((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    const robotOrderObj = {
      id: robotOrder.id,
      orderId: robotOrder.id,
      robotId: robotOrder.robotId,
      dayQuantity: duration.dayQuantity,
    };
    await updateRobotOrder(robotOrder.id, robotOrderObj, id).then((data) => setCart(data));
    await getSubTotalFromOrderId(id).then((res) => setSubTotal(res));
  };
  return (
    <Card className='cart-card'>
      <CardTitle>{robotsInformation.title}</CardTitle>
      <CardBody className="card-body">
        <img className="order-cart-img" src={robotsInformation.imageUrl} />
        <Input
          type='select'
          name='dayQuantity'
          id='dayQuantity'
          value={duration.dayQuantity}
          onChange={handleInputChange}
        >
          {days.map((day) => (
            <option defaultValue={duration.dayQuantity} key={day}>{day}</option>
          ))}
        </Input>
        <p>Price is {robotsInformation.price} dollars per day</p>
        <p defaultValue>Total for this robot: {total} dollars</p>
        <div><Button color="danger" onClick={() => handleClick('delete')}>Remove</Button></div>
      </CardBody>
    </Card>
  );
}

CartCard.propTypes = {
  robotsInformation: PropTypes.object,
  robotOrder: PropTypes.object,
  total: PropTypes.any,
  id: PropTypes.string,
  setCart: PropTypes.func,
  setSubTotal: PropTypes.func,
};
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Button,
//   Card, CardBody, CardTitle, Input
// } from 'reactstrap';
// import { getCartItem, getMappableRobotInfoFromOrderId, getSubTotalFromOrderId } from '../helpers/data/orderData';

// export default function CartCard({ user }) {
//   const [cartItem, setCartItem] = useState([]);
//   const [subTotal, setSubTotal] = useState([]);
//   const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//   useEffect(() => {
//     getCartItem(user.id).then((response) => {
//       if (response) {
//         getMappableRobotInfoFromOrderId(response.id).then((data) => setCartItem(data));
//         getSubTotalFromOrderId(response.id).then((total) => setSubTotal(total));
//       }
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     console.warn(e.target.value);
//   };
//   console.warn(cartItem);

//   const handleClick = (type) => {
//     if (type === 'delete') {
//       console.warn('delete');
//     }
//   };
//   return (
//       <Card className='cart-card'>
//         <CardBody>
//         <CardTitle></CardTitle>
//           <div className="cart-container">
//           {cartItem.map((x) => (
//             <div key={x.robotOrder?.id} className="individual-cart-card">
//               <Button color="danger" onClick={() => handleClick('delete')}>Remove</Button>
//               <h1>{x.robotsInformation?.title}</h1>
//               <img src={x.robotsInformation?.imageUrl} />
//               <Input
//                 type='select'
//                 name='days'
//                 id='dayQuantity'
//                 value={x.robotOrder.dayQuantity}
//                 onChange={handleInputChange}
//               >
//                 {days.map((day) => (
//                   <option defaultValue={x.robotOrder?.dayQuantity} key={day}>{day}</option>
//                 ))}
//               </Input>
//               <p>days</p>
//               <p>Price is {x.robotsInformation?.price} dollars per day</p>
//               <p>Total for this robot: {x.total} dollars</p>
//             </div>
//           ))}
//         </div>
//         <div>Total for this order: $ {subTotal.total}</div>
//         <Button>Order</Button>
//         </CardBody>
//       </Card>
//   );
// }

// CartCard.propTypes = {
//   user: PropTypes.any
// };
