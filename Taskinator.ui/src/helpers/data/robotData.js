import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const getRandomRobots = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/random`).then((response) => resolve(response.data)).catch(reject);
});

const getSingleRobot = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createRobot = (robotObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Robots`, robotObj).then((response) => resolve(response.data)).catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getRandomRobots, createRobot, getSingleRobot };
