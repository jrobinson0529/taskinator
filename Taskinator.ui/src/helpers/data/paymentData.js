import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const addPayment = (paymentObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Payments/addPayment`, paymentObj).then((response) => resolve(response)).catch(reject);
});

const getAllPaymentType = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Payments/paymentTypes`).then((response) => resolve(response.data)).catch(reject);
});

const getPayment = (accountNumber) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Payments/User/${accountNumber}`).then((response) => resolve(response.data)).catch(reject);
});

export { addPayment, getPayment, getAllPaymentType };
