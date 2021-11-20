import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  CardLink, Table
} from 'reactstrap';
import { getOrderHistory } from '../../helpers/data/orderData';

export default function OrderHisotry({ user }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrderHistory(user?.id).then((response) => setOrders(response));
  }, []);

  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/orderHistory/${id}`);
  };
  return (
    <Table striped bordered className='order-history-container'>
      <tbody className='order-history-card' >
        <tr>
          <th>Order Date</th>
          <th>Total Price</th>
          <th>Details</th>
        </tr>
        {orders?.map((order) => (
        <tr key={order.id}>
          <td>{order.orderDate}</td>
          <td>$ {order.orderTotal}</td>
          <td><CardLink href='#' onClick={() => handleClick(order.id)}>View Details</CardLink></td>
        </tr>
        ))}
    </tbody>
  </Table>
  );
}

OrderHisotry.propTypes = {
  user: PropTypes.any
};
