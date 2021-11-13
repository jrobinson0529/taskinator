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
const getUnavailableRobots = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/unavailable`).then((response) => resolve(response.data)).catch(reject);
});
const editRobot = (id, robotObject) => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/Robots/${id}`, robotObject).then(resolve).catch(reject);
});
const getAllRobotsAlphabetically = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/Robots/all`).then((response) => resolve(response.data)).catch(reject);
});
export {
  getRandomRobots, createRobot, getSingleRobot, getRobotByCategory, getRobots, getUnavailableRobots, editRobot, getAllRobotsAlphabetically
};
