import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card, CardBody, CardText, CardTitle
} from 'reactstrap';
import { getOrderHistory } from '../../helpers/data/orderData';

export default function OrderHisotry({ user }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrderHistory(user?.id).then((response) => setOrders(response));
  }, []);

  const history = useHistory();
  const handleClick = () => {
    history.push(`/orderHistory/${user?.id}`);
  };

  return (
    <div className='order-history-container'>
      {orders?.map((order) => (
        <Card className='order-history-card' key={order.id}>
          <CardTitle>{order.orderDate}</CardTitle>
          <CardBody>
            <CardText>Total $ {order.orderTotal}</CardText>
          </CardBody>
          <Button onClick={handleClick}>View Details</Button>
        </Card>
      ))}
    </div>
  );
}

OrderHisotry.propTypes = {
  user: PropTypes.any
};
