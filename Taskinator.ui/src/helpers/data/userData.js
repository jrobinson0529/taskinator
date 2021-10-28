import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const createUser = (userInfoObject) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Users`, userInfoObject).then((response) => resolve(response.data)).catch(reject);
});
const getSingleUserByGoogleId = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Users/uid/${id}`).then((response) => resolve(response.data)).catch(reject);
});

export {
  getSingleUserByGoogleId,
  createUser,
};
