import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

// get cart item with user ID
const getCartItem = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/cartItem/${id}`).then((response) => resolve(response.data)).catch(reject);
});

// get order history from customer ID
const getOrderHistory = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Orders/allOrders/${id}`).then((response) => resolve(response.data)).catch(reject);
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

// deleting robotOrder from robotId and map cart again
const deleteRobotsOrder = async (id, orderId) => new Promise((resolve, reject) => {
  axios.delete(`${apiUrl}/RobotsOrders/deleteSingleRobotOrderById/${id}`)
    .then(() => getMappableRobotInfoFromOrderId(orderId).then((data) => resolve(data)))
    .then(() => getSubTotalFromOrderId(orderId).then((data) => resolve(data)))
    .catch(reject);
});

// update robotOrder in Order(Cart) page
const updateRobotOrder = (id, orderObj, orderId) => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/RobotsOrders/updateRobotOrder/${id}`, orderObj)
    .then(() => getMappableRobotInfoFromOrderId(orderId).then((mappableArray) => resolve(mappableArray)))
    .then(() => getSubTotalFromOrderId(orderId).then((data) => resolve(data)))
    .catch(reject);
});

// finalize order
const finalizeOrder = (orderId, orderObj, cartObj) => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/Orders/placeOrder/${orderId}`, orderObj)
    .then(() => createCart(cartObj).then((data) => resolve(data)))
    .catch(reject);
});

export {
  getCartItem, getOrderHistory, getRobotInfoFromOrderId, getMappableRobotInfoFromOrderId,
  createCart, getSubTotalFromOrderId, deleteRobotsOrder, updateRobotOrder, finalizeOrder
};
