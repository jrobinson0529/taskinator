import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

// add to cart
const addToCart = (orderObject) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/robotsOrders/`, orderObject).then((response) => resolve(response.data)).catch(reject);
});

export default addToCart;
