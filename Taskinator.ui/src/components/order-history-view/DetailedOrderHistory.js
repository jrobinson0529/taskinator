import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card, CardBody, CardLink, CardText, CardTitle
} from 'reactstrap';
import { getMappableRobotInfoFromOrderId } from '../../helpers/data/orderData';

export default function DetailedOrderHistory() {
  const { id } = useParams();
  const [detailedOrder, setDetailedOrder] = useState([]);

  useEffect(() => {
    getMappableRobotInfoFromOrderId(id).then((response) => setDetailedOrder(response));
  }, []);

  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div className='detailed-order-container'>
      <h1>Order Date: {detailedOrder[0]?.orderDate}</h1>
      <h1>Payment Type: {detailedOrder[0]?.paymentInfo.paymentType}</h1>
      <h1>Order Total: $ {detailedOrder[0]?.orderTotal}</h1>
      <div className='detailed-order-robot-container'>
        {detailedOrder?.map((order) => (
          <Card className='detailed-order-card' key={order.robotOrder.robotId}>
            <CardTitle className='detailed-order-title'>Your Robot: {order.robotsInformation.title}</CardTitle>
            <CardBody>
              <img className='detailed-order-image' src={order.robotsInformation.imageUrl}/>
              <CardText>{order.robotsInformation.title}&apos;s day quantity: {order.robotOrder.dayQuantity} days</CardText>
              <CardText>{order.robotsInformation.title}&apos;s total price: $ {order.total}</CardText>
            </CardBody>
          </Card>
        ))}
      </div>
      <CardLink href='#' onClick={handleClick}>Return to Main Page</CardLink>
    </div>
  );
}
