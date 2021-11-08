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

  const handleInputChange = (e) => {
    setDuration((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const handleUpdate = async () => {
    const robotOrderObj = {
      id: robotOrder.id,
      orderId: robotOrder.id,
      robotId: robotOrder.robotId,
      dayQuantity: duration.dayQuantity,
    };
    await updateRobotOrder(robotOrder.id, robotOrderObj, id).then((data) => setCart(data));
    await getSubTotalFromOrderId(id).then((response) => setSubTotal(response));
  };

  return (
    <Card className='cart-card'>
      <CardTitle>{robotsInformation.title}</CardTitle>
      <CardBody className="card-body">
        <img className="order-cart-img" src={robotsInformation.imageUrl} />
        <div>
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
        </div>
        <Button onClick={handleUpdate}>Update</Button>
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
