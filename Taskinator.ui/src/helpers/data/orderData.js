import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

// get cart item with order ID
const getCartItem = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/cartItem/${id}`).then((response) => resolve(response.data)).catch(reject);
});

// testing purpose
const getRobotInfoFromOrderId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/expandedOrder/${id}`).then((response) => resolve(response.data)).catch(reject);
});

// Gigantic joint Order table
const getMappableRobotInfoFromOrderId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/detailedOrderInfo/${id}`).then((response) => resolve(response.data)).catch(reject);
});

// Create cart
const createCart = (cartObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Orders`, cartObj).then((response) => resolve(response.data)).catch(reject);
});

// Get subtotal
const getSubTotalFromOrderId = (orderId) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/subTotal/${orderId}`).then((response) => resolve(response.data)).catch(reject);
});

// trial for robotsOrder -- move this to robotsOrder data if works
const deleteRobotsOrder = (id) => new Promise((resolve, reject) => {
  axios.delete(`${apiUrl}/RobotsOrders/deleteSingleRobotOrderById/${id}`).then(resolve).catch(reject);
});

export {
  getCartItem, getRobotInfoFromOrderId, getMappableRobotInfoFromOrderId, createCart, getSubTotalFromOrderId, deleteRobotsOrder
};
