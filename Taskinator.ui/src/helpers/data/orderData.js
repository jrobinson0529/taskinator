import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

// get cart item
const getCartItem = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/cartItem/${id}`).then((response) => resolve(response.data)).catch(reject);
});

const getRobotFromOrderId = (orderId) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/RobotsOrders/getRobotOrderByOrderId/${orderId}`).then((response) => resolve(response.data)).catch(reject);
});

export { getCartItem, getRobotFromOrderId };
