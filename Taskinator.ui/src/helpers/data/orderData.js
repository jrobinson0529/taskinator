import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

// get cart item
const getCartItem = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/cartItem/${id}`).then((response) => resolve(response.data)).catch(reject);
});

const getRobotInfoFromOrderId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/expandedOrder/${id}`).then((response) => resolve(response.data)).catch(reject);
});

const getMappableRobotInfoFromOrderId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/detailedOrderInfo/${id}`).then((response) => resolve(response.data)).catch(reject);
});

const createCart = (cartObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Orders`, cartObj).then((response) => resolve(response.data)).catch(reject);
});

const tryUser = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Users/expanded/${id}`).then((response) => resolve(response.data)).catch(reject);
});

export {
  getCartItem, getRobotInfoFromOrderId, getMappableRobotInfoFromOrderId, createCart, tryUser,
};
