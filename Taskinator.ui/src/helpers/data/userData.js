import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const createUser = (userInfoObject) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Users`, userInfoObject).then((response) => resolve(response.data)).catch(reject);
});
const getSingleUserById = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Users/${id}`).then((response) => resolve(response.data)).catch(reject);
});
const getSingleUserByGoogleId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Users/uid/${id}`).then((response) => resolve(response.data)).catch(reject);
});
const updateUser = (id, userObject) => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/Users/${id}`, userObject).then((response) => resolve(response)).catch(reject);
});

export {
  getSingleUserByGoogleId,
  createUser,
  getSingleUserById,
  updateUser
};
