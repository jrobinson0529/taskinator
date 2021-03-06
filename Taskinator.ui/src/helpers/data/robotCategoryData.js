import axios from 'axios';
import { apiConfig } from '../apiKeys';

const { apiUrl } = apiConfig;

const getRobotCategories = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/RobotCategories`).then((response) => resolve(response.data)).catch(reject);
});

const getRobotCategoriesById = (id) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/RobotCategories/${id}`).then((response) => resolve(response.data)).catch(reject);
});
const getSingleRobotCategoryById = (robotId) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/RobotCategories`).then((response) => {
    const categories = response.data;
    resolve(categories.filter((category) => robotId === category.id));
  }).catch(reject);
});
export { getRobotCategories, getRobotCategoriesById, getSingleRobotCategoryById };
