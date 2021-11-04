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

const getDetailedOrderFromOrderId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/detailedOrderInfo/${id}`).then((response) => resolve(response.data)).catch(reject);
});

const createCart = (cartObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Orders`, cartObj).then((response) => resolve(response.data)).catch(reject);
});

export {
  getCartItem, getRobotFromOrderId, getDetailedOrderFromOrderId, createCart
};
