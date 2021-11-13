import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMappableRobotInfoFromOrderId } from '../../helpers/data/orderData';

export default function DetailedOrderHistory() {
  const { id } = useParams();
  useEffect(() => {
    getMappableRobotInfoFromOrderId(id).then((response) => console.warn(response));
  }, []);
  return (
    <h1>Hello {id}</h1>
  );
}
