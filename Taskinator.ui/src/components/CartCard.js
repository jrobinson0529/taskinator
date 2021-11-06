import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card, CardBody, CardTitle
} from 'reactstrap';
import { getCartItem, getRobotInfoFromOrderId } from '../helpers/data/orderData';

export default function CartCard({ user }) {
  const [cartItem, setCartItem] = useState([]);
  // const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  useEffect(() => {
    getCartItem(user.id).then((response) => {
      if (response) {
        getRobotInfoFromOrderId(response.id).then((data) => setCartItem(data));
      }
    });
  }, []);

  // const handleInputChange = (e) => {
  //   console.warn(e.target.key);
  // };
  console.warn(cartItem);
  return (
    <div>
      <Card className='bg-primary'>
        <CardBody>
          <CardTitle>{cartItem?.customerInfo.firstName}&apos;s Cart</CardTitle>
          {cartItem?.robotInfo.map((robot) => (
            <h2 key={robot.id}>{robot.title}</h2>
          ))}
          <Button>Order</Button>
        </CardBody>
      </Card>
    </div>
  );
}

CartCard.propTypes = {
  user: PropTypes.any
};
// export default function CartCard({ user }) {
//   const [cartItem, setCartItem] = useState([]);
//   const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//   useEffect(() => {
//     getCartItem(user.id).then((response) => {
//       if (response) {
//         getMappableRobotInfoFromOrderId(response.id).then((data) => setCartItem(data));
//       }
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     console.warn(e.target.key);
//   };
//   console.warn(cartItem);
//   return (
//     <div>
//       <Card className='bg-primary'>
//         <CardBody>
//           <CardTitle>{user?.firstName}&apos;s cart</CardTitle>
//           {cartItem.map((x) => (
//             <div key={x.robotOrder?.id}>
//               <h1>{x.robotsInformation?.title}</h1>
//               <img src={x.robotsInformation?.imageUrl} />
//               <Input
//                 type='select'
//                 name='days'
//                 id='daysQuantity'
//                 value={x.robotOrder.dayQuantity}
//                 onChange={handleInputChange}
//               >
//                 {days.map((day) => (
//                   <option value={x.robotOrder?.dayQuantity} key={x.robotOrder?.robotId}>{day}</option>
//                 ))}
//               </Input>
//               <p>days</p>
//               <p>Price is {x.robotsInformation?.price} dollars per day</p>
//               <p>Total for this robot: {x.robotOrder?.dayQuantity * x.robotsInformation?.price} dollars</p>
//             </div>
//           ))}
//           <Button>Order</Button>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }
