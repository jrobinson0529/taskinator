import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const getRandomRobots = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/random`).then((response) => resolve(response.data)).catch(reject);
});

const getRobots = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/`).then((response) => resolve(response.data)).catch(reject);
});

const createRobot = (robotObj) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/Robots`, robotObj).then((response) => resolve(response.data)).catch(reject);
});

const getRobotByCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/${categoryId}/robots`).then((response) => resolve(response.data)).catch(reject);
});

const getSingleRobot = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/${id}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getRandomRobots, createRobot, getSingleRobot, getRobotByCategory, getRobots
};
