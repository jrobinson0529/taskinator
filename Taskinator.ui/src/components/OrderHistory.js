import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrderHistory } from '../helpers/data/orderData';

export default function OrderHisotry({ user }) {
  useEffect(() => {
    getOrderHistory(user?.id).then((response) => console.warn(response));
  }, []);
  return (
    <div>
      <h1>Order</h1>
    </div>
  );
}

OrderHisotry.propTypes = {
  user: PropTypes.any
};
