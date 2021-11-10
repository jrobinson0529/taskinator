import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const addPayment = (id, paymentObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Payments`, id, paymentObj).then((response) => resolve(response)).catch(reject);
});

const getPayment = (accountNumber) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Payments/User/${accountNumber}`).then((response) => resolve(response.data)).catch(reject);
});

export { addPayment, getPayment };
